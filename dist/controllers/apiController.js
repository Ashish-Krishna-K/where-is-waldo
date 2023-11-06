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
exports.postLeaderboard = exports.getLeaderboard = exports.getGameImgInfo = exports.getAllGameImgsId = void 0;
const gameImg_1 = __importDefault(require("../models/gameImg"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const getAllGameImgsId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allImgsId = yield gameImg_1.default.find({}, 'gameName').exec();
        if (allImgsId.length < 1)
            return res.status(404).json({ error: 'No data.' });
        return res.json({ allImgsId });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});
exports.getAllGameImgsId = getAllGameImgsId;
const getGameImgInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameImg = yield gameImg_1.default.findById(req.params.gameId, '-leaderboard').exec();
        if (!gameImg)
            return res.status(404).json({ error: 'Game Image data not found.' });
        return res.json({ gameImg });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});
exports.getGameImgInfo = getGameImgInfo;
const getLeaderboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameImg = yield gameImg_1.default.findById(req.params.gameId)
            .populate('leaderboard')
            .exec();
        if (!gameImg)
            return res.status(404).json({ error: 'Game Image data not found.' });
        const sorted = gameImg.leaderboard.slice().sort((a, b) => a.completionTime - b.completionTime);
        return res.json({ gameName: gameImg.gameName, leaderboard: sorted });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});
exports.getLeaderboard = getLeaderboard;
const postLeaderboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const completionTime = (_a = req.body.time) === null || _a === void 0 ? void 0 : _a.trim();
        if (!completionTime || completionTime.length < 1)
            return res.status(406).json({ error: 'Completion time is required' });
        const gameImg = yield gameImg_1.default.findById(req.params.gameId, 'leaderboard').exec();
        if (!gameImg)
            return res.status(404).json({ error: 'Game Image data not found.' });
        const newEntry = new leaderboard_1.default({
            displayName: req.body.name || undefined,
            completionTime,
        });
        yield newEntry.save();
        gameImg.leaderboard.push(newEntry._id);
        yield gameImg.save();
        return res.sendStatus(201);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});
exports.postLeaderboard = postLeaderboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hcGlDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdFQUEwQztBQUMxQyx3RUFBd0U7QUFFakUsTUFBTSxnQkFBZ0IsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUNwRSxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsTUFBTSxpQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUQsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDN0UsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztLQUNoQztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUMsQ0FBQSxDQUFDO0FBVFcsUUFBQSxnQkFBZ0Isb0JBUzNCO0FBRUssTUFBTSxjQUFjLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDbEUsSUFBSTtRQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0saUJBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkYsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPLEdB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