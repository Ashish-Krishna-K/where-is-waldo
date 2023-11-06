import express from 'express';

import indexRouter from '../routes/index.js';
import apiRouter from '../routes/api.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.all('*', (req, res) => {
  res.redirect('/');
});

export default app;
