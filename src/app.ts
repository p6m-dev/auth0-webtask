import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import webtask from '../webtask.json';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Always Last
app.use('/meta', (req, res) => {
  res.status(200).send(webtask);
});

app.use('/.lifecycle', (req, res) => {
  res.status(204).send();
});

app.use('/', (req, res) => {
  res.status(200).json({ healthy: true, version: webtask.version });
});

export default app;
