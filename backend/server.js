import express from 'express';
import corsLoader from "./loaders/corsLoader.js";
import morganLoader from "./loaders/morganLoader.js";
import mountRoutes from "./routes/index.js";
import dotenv from 'dotenv';
import { connectionTracker } from "./loaders/connectionTracker.js";
import sessionLoader from "./loaders/sessionLoader.js";
import passportLoader from "./loaders/passportLoader.js";
import { updateLastActivity } from "./middleware/authMiddleware.js";

dotenv.config();

export const port = process.env.PORT;
const app = express();

// Middleware and app configuration
app.set('trust proxy', 1);
app.use(express.json());
morganLoader(app);
corsLoader(app);
connectionTracker(app);
sessionLoader(app);
passportLoader(app);
app.use(updateLastActivity);

// Mount routes
mountRoutes(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
