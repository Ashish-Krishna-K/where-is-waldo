"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiController_1 = require("../controllers/apiController");
const router = express_1.default.Router();
// GET all images Ids
router.get('/', apiController_1.getAllGameImgsId);
// GET leaderboard for a game image
router.get('/:gameId/leaderboard', apiController_1.getLeaderboard);
// POST leaderboard entry
router.post('/:gameId/leaderboard', apiController_1.postLeaderboard);
// GET details of game image
router.get('/:gameId', apiController_1.getGameImgInfo);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsZ0VBQWlIO0FBRWpILE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGdDQUFnQixDQUFDLENBQUM7QUFFbEMsbUNBQW1DO0FBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsOEJBQWMsQ0FBQyxDQUFDO0FBRW5ELHlCQUF5QjtBQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLCtCQUFlLENBQUMsQ0FBQztBQUVyRCw0QkFBNEI7QUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsOEJBQWMsQ0FBQyxDQUFDO0FBRXZDLGtCQUFlLE1BQU0sQ0FBQyJ9