import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import apiRouter from './routes/api.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.all('*', (req, res) => {
  res.redirect('/');
});

module.exports = app;
