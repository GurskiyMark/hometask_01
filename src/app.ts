import express from 'express';
import { videosRouter } from './routes/videosRouter';

const app = express();
app.use(express.json());

// Все роуты
app.use('/hometask_01/api/videos', videosRouter);

// Корень можно просто вернуть что-то
app.get('/', (req, res) => res.send('API работает'));

export { app };
