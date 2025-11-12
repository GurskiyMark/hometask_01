import express from 'express';
import { videosRouter } from './routes/videosRouter';
import { testingRouter } from './routes/testingRouter';

const app = express();
app.use(express.json());

app.use('/videos', videosRouter);
app.use('/testing/all-data', testingRouter);

export { app };

// для хранения видео в памяти
global.videos = global.videos || [];
