import type { Request, Response } from 'express';
import GameImage from '../models/gameImg';
import Leaderboard, { type ILeaderboardSchema } from '../models/leaderboard';

// GET all images Ids
export const getAllGameImgsId = async (req: Request, res: Response) => {
  try {
    const allImgsId = await GameImage.find({}, 'gameName').exec();
    if (allImgsId.length < 1) return res.status(404).json({ error: 'No data.' });
    return res.json({ allImgsId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

// GET details of game image
export const getGameImgInfo = async (req: Request, res: Response) => {
  try {
    const gameImg = await GameImage.findById(req.params.gameId, '-leaderboard').exec();
    if (!gameImg) return res.status(404).json({ error: 'Game Image data not found.' });
    return res.json({ gameImg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

// GET leaderboard for a game image
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const gameImg = await GameImage.findById(req.params.gameId)
      .populate<{ leaderboard: ILeaderboardSchema[] }>('leaderboard')
      .exec();
    if (!gameImg) return res.status(404).json({ error: 'Game Image data not found.' });
    // Sort by completion time, first create a copy so as to not mutate the original array.
    const sorted = gameImg.leaderboard.slice().sort((a, b) => a.completionTime - b.completionTime);
    return res.json({ gameName: gameImg.gameName, leaderboard: sorted });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

// POST leaderboard entry
export const postLeaderboard = async (req: Request, res: Response) => {
  try {
    const completionTime = req.body.time?.trim();
    if (!completionTime || completionTime.length < 1)
      return res.status(406).json({ error: 'Completion time is required' });
    const gameImg = await GameImage.findById(req.params.gameId, 'leaderboard').exec();
    if (!gameImg) return res.status(404).json({ error: 'Game Image data not found.' });
    const newEntry = new Leaderboard({
      // if the incoming data doesn't have any value for the name field, then pass
      // undefined so as to trigger the default value in the model.
      displayName: req.body.name || undefined,
      completionTime,
    });
    await newEntry.save();
    gameImg.leaderboard.push(newEntry._id);
    await gameImg.save();
    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
