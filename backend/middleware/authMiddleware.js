import * as usersRepository from "../repositories/usersRepository.js";
import { computeTimeSpent } from "../utils/durations.js";

export const updateLastActivity = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const userId = req.user.id;
        const sessionStartTime = req.user.sessionStartTime;
        const lastActivityTime = new Date();
        const newTimeSpent = computeTimeSpent(sessionStartTime, lastActivityTime);

        // Update the session data
        req.user.lastActivity = lastActivityTime;
        req.user.timeSpent = newTimeSpent;

        // Update the database as well (persist the change)
        try {
            const result = await usersRepository.updateUser(userId, { lastActivityTime });
            if (result) {
                return next();  // Continue with the request processing
            } else {
                return res.status(500).json({ error: "Failed to update user activity in DB" });
            }
        } catch (error) {
            console.error("Error updating user activity:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    return res.status(401).json({ err: "Not logged in" });
};
