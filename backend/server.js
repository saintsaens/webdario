import express from 'express';
import corsLoader from "./loaders/corsLoader.js";
import morganLoader from "./loaders/morganLoader.js";
import mountRoutes from "./routes/index.js";
import { startStream } from "./services/streamHandler.js";

export const port = 3001;
const app = express();

// Middleware and app configuration
app.set('trust proxy', 1);
app.use(express.json());
morganLoader(app);
corsLoader(app);

// Mount routes
mountRoutes(app);

await startStream();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
