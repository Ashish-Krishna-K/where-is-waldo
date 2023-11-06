import request from 'supertest';
import app from './testApp.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import GameImage from '../models/gameImg';
import Leaderboard from '../models/leaderboard';

const getTestImgData = () => {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(
      new GameImage({
        gameName: 'test 1',
        answers: [
          {
            name: 'test ans',
            xAxis: 0,
            yAxis: 0,
          },
        ],
      }),
    );
  }
  return arr;
};

const getTestLeaderboard = () => {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(
      new Leaderboard({
        completionTime: 0,
      }),
    );
  }
  return arr;
};

const createTestDb = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  try {
    console.log('Connecting to test DB...');
    await mongoose.connect(mongoUri);
    console.log('Connected');
    console.log('adding img data...');
    await Promise.all(getTestImgData().map((item) => item.save()));
    console.log('added img data.');
    console.log('adding leaderboard data...');
    const imgData = await GameImage.find().exec();
    imgData.forEach(async (item) => {
      const leaderboardEntries = await Promise.all(getTestLeaderboard().map((entry) => entry.save()));
      const idArr = leaderboardEntries.map((entry) => entry._id);
      item.leaderboard.push(...idArr);
      await item.save();
    });
    console.log('added leaderboard entries.');
  } catch (error) {
    if (typeof error === 'object' && error !== null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = error as Record<any, any>;
      if (e.message.code === 'ETIMEDOUT') {
        await mongoose.connect(mongoUri);
      }
    }
    console.error(error);
  }
};

beforeAll(async () => {
  await createTestDb();
});

afterAll(async () => {
  try {
    console.log('attempting to close connection...');
    await mongoose.connection.close(true);
    console.log('connection closed');
  } catch (error) {
    console.error(error);
    await mongoose.connection.close(true);
  }
});

describe('tests the apiRoutes', () => {
  test('tests GET api/', async () => {
    const res = await request(app).get('/api/');
    expect(res.statusCode).toBe(200);
    expect(res.body.allImgsId.length).toBe(3);
  });
  test('tests GET api/:gameId', async () => {
    const allImgs = await request(app).get('/api/');
    const imgData = await request(app).get(`/api/${allImgs.body.allImgsId[0].id}`);
    expect(imgData.statusCode).toBe(200);
    expect(imgData.body.gameImg.gameName).toMatch(/test 1/i);
  });
  test('tests GET api/:gameId/leaderboard', async () => {
    const allImgs = await request(app).get('/api/');
    const leaderboard = await request(app).get(`/api/${allImgs.body.allImgsId[0].id}/leaderboard`);
    expect(leaderboard.statusCode).toBe(200);
    expect(leaderboard.body.leaderboard.length).toBe(3);
  });
  test('tests POST api/:gameId/leaderboard', async () => {
    const allImgs = await request(app).get('/api/');
    const res = await request(app).post(`/api/${allImgs.body.allImgsId[0].id}/leaderboard`).send({ time: "0" });
    expect(res.statusCode).toBe(201);
    const leaderboard = await request(app).get(`/api/${allImgs.body.allImgsId[0].id}/leaderboard`);
    expect(leaderboard.body.leaderboard.length).toBe(4);
    expect(leaderboard.body.leaderboard[3].displayName).toMatch(/anonymous player/i);
  });
});
