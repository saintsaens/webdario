import { streamRouter } from './stream.js';
import { metadataRouter } from './metadata.js';

const mountRoutes = (app) => {
    app.use('/', streamRouter);
    app.use('/metadata', metadataRouter);
}

export default mountRoutes;