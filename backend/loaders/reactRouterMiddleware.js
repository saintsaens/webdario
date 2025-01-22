import path from 'path';

const reactRouterMiddleware = () => {
    const __dirname = path.resolve(); // Ensure compatibility with ES modules
    const buildPath = path.join(__dirname, 'build');

    return (req, res, next) => {
        // Serve `index.html` only for non-API routes and after static file checks
        if (req.method === 'GET' && !req.path.startsWith('/api')) {
            res.sendFile(path.resolve(buildPath, 'index.html'));
        } else {
            next(); // Pass control to the next middleware/route
        }
    };
};

export default reactRouterMiddleware;
