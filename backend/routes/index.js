import { streamRouter } from './stream.js';
import { metadataRouter } from './metadata.js';

const mountRoutes = (app) => {
    app.use('/', streamRouter);
}

export default mountRoutes;