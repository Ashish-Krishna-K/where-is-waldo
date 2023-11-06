"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const testApp_js_1 = __importDefault(require("./testApp.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const gameImg_1 = __importDefault(require("../models/gameImg"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const getTestImgData = () => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
        arr.push(new gameImg_1.default({
            gameName: 'test 1',
            answers: [
                {
                    name: 'test ans',
                    xAxis: 0,
                    yAxis: 0,
                },
            ],
        }));
    }
    return arr;
};
const getTestLeaderboard = () => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
        arr.push(new leaderboard_1.default({
            completionTime: 0,
        }));
    }
    return arr;
};
const createTestDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    try {
        console.log('Connecting to test DB...');
        yield mongoose_1.default.connect(mongoUri);
        console.log('Connected');
        console.log('adding img data...');
        yield Promise.all(getTestImgData().map((item) => item.save()));
        console.log('added img data.');
        console.log('adding leaderboard data...');
        const imgData = yield gameImg_1.default.find().exec();
        imgData.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            const leaderboardEntries = yield Promise.all(getTestLeaderboard().map((entry) => entry.save()));
            const idArr = leaderboardEntries.map((entry) => entry._id);
            item.leaderboard.push(...idArr);
            yield item.save();
        }));
        console.log('added leaderboard entries.');
    }
    catch (error) {
        if (typeof error === 'object' && error !== null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const e = error;
            if (e.message.code === 'ETIMEDOUT') {
                yield mongoose_1.default.connect(mongoUri);
            }
        }
        console.error(error);
    }
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield createTestDb();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('attempting to close connection...');
        yield mongoose_1.default.connection.close(true);
        console.log('connection closed');
    }
    catch (error) {
        console.error(error);
        yield mongoose_1.default.connection.close(true);
    }
}));
describe('tests the apiRoutes', () => {
    test('tests GET api/', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(testApp_js_1.default).get('/api/');
        expect(res.statusCode).toBe(200);
        expect(res.body.allImgsId.length).toBe(3);
    }));
    test('tests GET api/:gameId', () => __awaiter(void 0, void 0, void 0, function* () {
        const allImgs = yield (0, supertest_1.default)(testApp_js_1.default).get('/api/');
        const imgData = yield (0, supertest_1.default)(testApp_js_1.default).get(`/api/${allImgs.body.allImgsId[0].id}`);
        expect(imgData.statusCode).toBe(200);
        expect(imgData.body.gameImg.gameName).toMatch(/test 1/i);
    }));
    test('tests GET api/:gameId/leaderboard', () => __awaiter(void 0, void 0, void 0, function* () {
        const allImgs = yield (0, supertest_1.default)(testApp_js_1.default).get('/api/');
        const leaderboard = yield (0, supertest_1.default)(testApp_js_1.default).get(`/api/${allImgs.body.allImgsId[0].id}/leaderboard`);
        expect(leaderboard.statusCode).toBe(200);
        expect(leaderboard.body.leaderboard.length).toBe(3);
    }));
    test('tests POST api/:gameId/leaderboard', () => __awaiter(void 0, void 0, void 0, function* () {
        const allImgs = yield (0, supertest_1.default)(testApp_js_1.default).get('/api/');
        const res = yield (0, supertest_1.default)(testApp_js_1.default).post(`/api/${allImgs.body.allImgsId[0].id}/leaderboard`).send({ time: "0" });
        expect(res.statusCode).toBe(201);
        const leaderboard = yield (0, supertest_1.default)(testApp_js_1.default).get(`/api/${allImgs.body.allImgsId[0].id}/leaderboard`);
        expect(leaderboard.body.leaderboard.length).toBe(4);
        expect(leaderboard.body.leaderboard[3].displayName).toMatch(/anonymous player/i);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpQ29udHJvbGxlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3RzL2FwaUNvbnRyb2xsZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFnQztBQUNoQyw4REFBK0I7QUFDL0Isd0RBQWdDO0FBQ2hDLGlFQUEwRDtBQUMxRCxnRUFBMEM7QUFDMUMsd0VBQWdEO0FBRWhELE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRTtJQUMxQixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQ04sSUFBSSxpQkFBUyxDQUFDO1lBQ1osUUFBUSxFQUFFLFFBQVE7WUFDbEIsT0FBTyxFQUFFO2dCQUNQO29CQUNFLElBQUksRUFBRSxVQUFVO29CQUNoQixLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsQ0FBQztpQkFDVDthQUNGO1NBQ0YsQ0FBQyxDQUNILENBQUM7S0FDSDtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRUYsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7SUFDOUIsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMxQixHQUFHLENBQUMsSUFBSSxDQUNOLElBQUkscUJBQVcsQ0FBQztZQUNkLGNBQWMsRUFBRSxDQUFDO1NBQ2xCLENBQUMsQ0FDSCxDQUFDO0tBQ0g7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLEdBQVMsRUFBRTtJQUM5QixNQUFNLFdBQVcsR0FBRyxNQUFNLHlDQUFpQixDQUFD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