import cors from "cors";
import { port } from "../server.js";

const corsLoader = (app) => {
  app.use(cors({
    origin: `http://localhost:${port}`,
    credentials: true,
  }));
};

export default corsLoader;