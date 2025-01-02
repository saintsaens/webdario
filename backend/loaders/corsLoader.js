import cors from "cors";

const corsLoader = (app) => {
  app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true,
  }));
};

export default corsLoader;