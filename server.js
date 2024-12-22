import express from 'express';
import corsLoader from "./loaders/corsLoader.js";
import morganLoader from "./loaders/morganLoader.js";
import mountRoutes from "./routes/index.js";

const app = express();
const port = 3001;

morganLoader(app);
corsLoader(app);

// Mount routes
mountRoutes(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
