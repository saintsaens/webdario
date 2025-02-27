import { Router } from 'express';
import { getCoudrierStream, getLofiStream } from '../controllers/streamController.js';

export const streamRouter = Router();

streamRouter.get('/lofi', getLofiStream);
streamRouter.get('/coudrier', getCoudrierStream);
