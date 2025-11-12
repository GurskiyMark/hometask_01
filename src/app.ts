import express from 'express';
import { videosRouter } from './routes/videosRouter';

export const app = express();
app.use(express.json());

app.use('/hometask_01/api/videos', videosRouter);
