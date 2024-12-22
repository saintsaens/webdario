import { streamRouter } from '../routes/stream.js';

const mountRoutes= (app) => {
    app.use('/', streamRouter);
}

export default mountRoutes;