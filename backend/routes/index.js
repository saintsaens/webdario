import { streamRouter } from './stream.js';
import { metadataRouter } from './metadata.js';

const mountRoutes = (app) => {
    app.use('/api/', streamRouter);
    app.use('/api/metadata', metadataRouter);
}

export default mountRoutes;