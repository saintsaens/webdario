import express from 'express';
import corsLoader from "./loaders/corsLoader.js";
import morganLoader from "./loaders/morganLoader.js";
import mountRoutes from "./routes/index.js";
import dotenv from 'dotenv';
import { connectionTracker } from "./loaders/connectionTracker.js";

dotenv.config();

export const port = process.env.PORT;
const app = express();

// Middleware and app configuration
app.set('trust proxy', 1);
app.use(express.json());
morganLoader(app);
corsLoader(app);
connectionTracker(app);

// Mount routes
mountRoutes(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
