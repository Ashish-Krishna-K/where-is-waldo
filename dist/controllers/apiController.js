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
// GET all images Ids
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
// GET details of game image
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
// GET leaderboard for a game image
const getLeaderboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameImg = yield gameImg_1.default.findById(req.params.gameId)
            .populate('leaderboard')
            .exec();
        if (!gameImg)
            return res.status(404).json({ error: 'Game Image data not found.' });
        // Sort by completion time, first create a copy so as to not mutate the original array.
        const sorted = gameImg.leaderboard.slice().sort((a, b) => a.completionTime - b.completionTime);
        return res.json({ gameName: gameImg.gameName, leaderboard: sorted });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
});
exports.getLeaderboard = getLeaderboard;
// POST leaderboard entry
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
            // if the incoming data doesn't have any value for the name field, then pass
            // undefined so as to trigger the default value in the model.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hcGlDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdFQUEwQztBQUMxQyx3RUFBNkU7QUFFN0UscUJBQXFCO0FBQ2QsTUFBTSxnQkFBZ0IsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUNwRSxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsTUFBTSxpQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUQsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDN0UsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztLQUNoQztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUMsQ0FBQSxDQUFDO0FBVFcsUUFBQSxnQkFBZ0Isb0JBUzNCO0FBRUYsNEJBQTRCO0FBQ3JCLE1BQU0sY0FBYyxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ2xFLElBQUk7UUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLGlCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25GLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxDQUFDLENBQUM7UUFDbkYsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUM5QjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUMsQ0FBQSxDQUFDO0FBVFcsUUFBQSxjQUFjLGtCQVN6QjtBQUVGLG1DQUFtQztBQUM1QixNQUFNLGNBQWMsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUNsRSxJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUN4RCxRQUFRLENBQXdDLGFBQWEsQ0FBQzthQUM5RCxJQUFJLEVBQUUsQ0FBQztRQUNWLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxDQUFDLENBQUM7UUFDbkYsdUZBQXVGO1FBQ3ZGLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDdEU7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDeEM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQWJXLFFBQUEsY0FBYyxrQkFhekI7QUFFRix5QkFBeUI7QUFDbEIsTUFBTSxlQUFlLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7O0lBQ25FLElBQUk7UUFDRixNQUFNLGNBQWMsR0FBRyxNQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSwwQ0FBRSxJQUFJLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsY0FBYyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUM5QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLDZCQUE2QixFQUFFLENBQUMsQ0FBQztRQUN4RSxNQUFNLE9BQU8sR0FBRyxNQUFNLGlCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxDQUFDLENBQUM7UUFDbkYsTUFBTSxRQUFRLEdBQUcsSUFBSSxxQkFBVyxDQUFDO1lBQy9CLDRFQUE0RTtZQUM1RSw2REFBNkQ7WUFDN0QsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVM7WUFDdkMsY0FBYztTQUNmLENBQUMsQ0FBQztRQUNILE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDNUI7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDeEM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQXJCVyxRQUFBLGVBQWUsbUJBcUIxQiJ9