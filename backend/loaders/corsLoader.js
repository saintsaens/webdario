import cors from "cors";

const corsLoader = (app) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
  app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));
};

export default corsLoader;