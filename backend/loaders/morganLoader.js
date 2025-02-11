import morgan from "morgan";

const morganLoader = (app) => {
    app.use(
        morgan(
            ':method :url :status [:date]',
            {
                skip: (req) => req.method === "OPTIONS",
            }
        ));
};

export default morganLoader;