import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import meta from './routes/meta';
import lifecycle from './routes/lifecycle';
import api from './routes/api';
import { version } from '../webtask.json';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', api());
app.use('/meta', meta());
app.use('/.lifecycle', lifecycle());

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', url: req.url, version });
});

export default app;
