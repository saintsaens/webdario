import { Router } from 'express';
import { getMetadata, updateMetadata } from '../controllers/metadataController.js';

export const metadataRouter = Router();

metadataRouter.get('/', getMetadata);
metadataRouter.put('/', updateMetadata);
