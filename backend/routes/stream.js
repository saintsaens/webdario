import { Router } from 'express';
import { handleStreamRequest } from '../controllers/streamController.js';

export const streamRouter = Router();

streamRouter.get('/', handleStreamRequest);