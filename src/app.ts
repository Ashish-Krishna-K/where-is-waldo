import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import connectDb from './database.js';
import indexRouter from './routes/index.js';
import apiRouter from './routes/api.js';

const app = express();

const publicPath = path.join(__dirname, '..', 'frontend', 'dist');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicPath));

connectDb();

app.use(cors());
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.all('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;
