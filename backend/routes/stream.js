import { Router } from 'express';
import { getCoudrierStream, getLofiStream, getLofiSegment } from '../controllers/streamController.js';

export const streamRouter = Router();

streamRouter.get('/coudrier', getCoudrierStream);
streamRouter.get('/lofi', getLofiStream);
streamRouter.get('/public/lofi/:segmentName', getLofiSegment);
