import { Router } from 'express';
import { getCoudrierStream, getLofiStream } from '../controllers/streamController.js';

export const streamRouter = Router();

streamRouter.get('/coudrier', getCoudrierStream);
streamRouter.get('/lofi', getLofiStream);
