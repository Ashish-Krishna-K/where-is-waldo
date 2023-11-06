import express from 'express';
import { getAllGameImgsId, getGameImgInfo, getLeaderboard, postLeaderboard } from '../controllers/apiController';

const router = express.Router();

// GET all images Ids
router.get('/', getAllGameImgsId);

// GET leaderboard for a game image
router.get('/:gameId/leaderboard', getLeaderboard);

// POST leaderboard entry
router.post('/:gameId/leaderboard', postLeaderboard);

// GET details of game image
router.get('/:gameId', getGameImgInfo);

export default router;
