import path from 'path';

const reactRouterMiddleware = () => {
    const __dirname = path.resolve();
    const buildPath = path.join(__dirname, 'build');

    return (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    };
};

export default reactRouterMiddleware;