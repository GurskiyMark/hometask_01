import { Router } from 'express';

export const testingRouter = Router();

testingRouter.delete('/', (req, res) => {
  global.videos = [];
  res.sendStatus(204);
});
