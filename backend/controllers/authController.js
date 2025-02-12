import passport from "passport";

export const login = passport.authenticate('google');

export const redirectBack = 
    passport.authenticate("google", {
        successRedirect: 'http://localhost:5173/',
        failureRedirect: 'http://localhost:5173/'
    });

export const logout = async (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({error: "Logout failed"});
        res.json({ message: 'Logout successful' });
    });
};

export const getUserProfile = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            id: req.user.id,
            username: req.user.username,
            sessionStartTime: req.user.sessionStartTime,
            lastActivity: req.user.lastActivity,
            timeSpent: req.user.timeSpent,
        });
    } else {
        res.status(204).json({err: "Nope."});
    }
};
