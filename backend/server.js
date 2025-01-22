import express from 'express';
import http from 'http';
import corsLoader from "./loaders/corsLoader.js";
import morganLoader from "./loaders/morganLoader.js";
import mountRoutes from "./routes/index.js";
import dotenv from 'dotenv';
import connectionTracker from "./utils/connectionTracker.js";

dotenv.config();

export const port = process.env.PORT;
const app = express();

// Middleware and app configuration
app.set('trust proxy', 1);
app.use(express.json());
morganLoader(app);
corsLoader(app);

// Mount routes
mountRoutes(app);

// Create an HTTP server to track connections
const server = http.createServer(app);
connectionTracker(server);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
