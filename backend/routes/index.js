import { streamRouter } from './stream.js';
import { segmentRouter } from './segment.js';
import { usersRouter } from "./users.js";

const mountRoutes = (app) => {
    app.use('/api/', streamRouter);
    app.use('/api/segment', segmentRouter);
    app.use('/api/users', usersRouter);
}

export default mountRoutes;
