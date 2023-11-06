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
// Create fake img data for testing
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
// create fake leaderboard data for testing
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
        const res = yield (0, supertest_1.default)(testApp_js_1.default).post(`/api/${allImgs.body.allImgsId[0].id}/leaderboard`).send({ time: '0' });
        expect(res.statusCode).toBe(201);
        const leaderboard = yield (0, supertest_1.default)(testApp_js_1.default).get(`/api/${allImgs.body.allImgsId[0].id}/leaderboard`);
        expect(leaderboard.body.leaderboard.length).toBe(4);
        expect(leaderboard.body.leaderboard[3].displayName).toMatch(/anonymous player/i);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpQ29udHJvbGxlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3RzL2FwaUNvbnRyb2xsZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFnQztBQUNoQyw4REFBK0I7QUFDL0Isd0RBQWdDO0FBQ2hDLGlFQUEwRDtBQUMxRCxnRUFBMEM7QUFDMUMsd0VBQWdEO0FBRWhELG1DQUFtQztBQUNuQyxNQUFNLGNBQWMsR0FBRyxHQUFHLEVBQUU7SUFDMUIsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMxQixHQUFHLENBQUMsSUFBSSxDQUNOLElBQUksaUJBQVMsQ0FBQztZQUNaLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsS0FBSyxFQUFFLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUM7aUJBQ1Q7YUFDRjtTQUNGLENBQUMsQ0FDSCxDQUFDO0tBQ0g7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQztBQUVGLDJDQUEyQztBQUMzQyxNQUFNLGtCQUFrQixHQUFHLEdBQUcsRUFBRTtJQUM5QixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQ04sSUFBSSxxQkFBVyxDQUFDO1lBQ2QsY0FBYyxFQUFFLENBQUM7U0FDbEIsQ0FBQyxDQUNILENBQUM7S0FDSDtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRUYsTUFBTSxZQUFZLEdBQUcsR0FBUyxFQUFFO0lBQzlCLE1BQU0s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