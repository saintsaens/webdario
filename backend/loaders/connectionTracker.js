export const connectionTracker = (server) => {
    let connectionCount = 0;

    server.on('connection', (socket) => {
        connectionCount++;
        console.log(`New connection established. Total connections: ${connectionCount}`);

        socket.on('close', () => {
            connectionCount--;
            console.log(`Connection closed. Total connections: ${connectionCount}`);
        });
    });

    setInterval(() => {
        console.log(`Current active connections: ${connectionCount}`);
    }, 5 * 60 * 1000); // Log every 5 minutes
};
