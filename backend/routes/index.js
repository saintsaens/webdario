import { streamRouter } from './stream.js';

const mountRoutes= (app) => {
    app.use('/', streamRouter);
}

export default mountRoutes;