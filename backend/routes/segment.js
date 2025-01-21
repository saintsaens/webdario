import { Router } from 'express';
import { getSegment } from "../controllers/segmentController.js";

export const segmentRouter = Router();

segmentRouter.get('/:channelName/:segmentName', getSegment);
