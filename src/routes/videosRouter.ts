import { Router, Request, Response } from 'express';
import { videos, db } from '../db/db';

export const videosRouter = Router();

const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];

const validateVideoInput = (body: any) => {
  const errors: any[] = [];

  if (!body.title || typeof body.title !== 'string' || body.title.trim().length > 40) {
    errors.push({ message: 'Incorrect title', field: 'title' });
  }

  if (!body.author || typeof body.author !== 'string' || body.author.trim().length > 20) {
    errors.push({ message: 'Incorrect author', field: 'author' });
  }

  if (!Array.isArray(body.availableResolutions)) {
    errors.push({ message: 'Incorrect resolutions', field: 'availableResolutions' });
  }

  return errors;
};

// GET all videos
videosRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send(videos);
});

// GET by id
videosRouter.get('/:id', (req: Request, res: Response) => {
  const video = videos.find(v => v.id === +req.params.id);
  if (!video) return res.sendStatus(404);
  res.status(200).send(video);
});

// POST create
videosRouter.post('/', (req: Request, res: Response) => {
  const errors = validateVideoInput(req.body);
  if (errors.length > 0) return res.status(400).send({ errorsMessages: errors });

  const newVideo = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date(Date.now() + 86400000).toISOString(),
    availableResolutions: req.body.availableResolutions,
  };

  videos.push(newVideo);
  res.status(201).send(newVideo);
});

// PUT update
videosRouter.put('/:id', (req: Request, res: Response) => {
  const video = videos.find(v => v.id === +req.params.id);
  if (!video) return res.sendStatus(404);

  const errors = validateVideoInput(req.body);
  if (errors.length > 0) return res.status(400).send({ errorsMessages: errors });

  Object.assign(video, req.body);
  res.sendStatus(204);
});

// DELETE by id
videosRouter.delete('/:id', (req: Request, res: Response) => {
  const index = videos.findIndex(v => v.id === +req.params.id);
  if (index === -1) return res.sendStatus(404);
  videos.splice(index, 1);
  res.sendStatus(204);
});

// DELETE all
videosRouter.delete('/../testing/all-data', (req: Request, res: Response) => {
  db.reset();
  res.sendStatus(204);
});
