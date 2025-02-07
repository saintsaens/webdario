export const connectionTracker = (app) => {
    const connections = new Map(); // Tracks IPs and their last connection time

    // Middleware to track connections
    app.use((req, res, next) => {
        const ip = req.ip; // Get the IP address of the request
        const now = Date.now();

        // Update or add the IP in the Map
        connections.set(ip, now);

        // Clean up entries older than 30 minutes
        const INTERVAL = 30 * 60 * 1000;
        for (const [key, timestamp] of connections) {
            if (now - timestamp > INTERVAL) {
                connections.delete(key);
            }
        }

        next();
    });

    // Periodically log the number of unique connections and the IPs
    setInterval(() => {
        console.log(`Unique connections in the past 10 minutes: ${connections.size}`);
        
        for (const [ip] of connections) {
            console.log(`IP: ${ip}`);
        }
    }, 10* 1000); // Every 10 seconds
};