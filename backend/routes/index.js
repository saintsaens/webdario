import { streamRouter } from './stream.js';
import { segmentRouter } from './segment.js';
import { metadataRouter } from './metadata.js';

const mountRoutes = (app) => {
    app.use('/api/', streamRouter);
    app.use('/api/segment', segmentRouter);
}

export default mountRoutes;