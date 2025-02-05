import * as usersService from "../services/usersService.js";

export const createUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const newUser = await usersService.createUser(username, password);
        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        console.error(err);  // Log the error for debugging
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    if (!username && !password) {
        return res.status(400).json({ error: "At least one field (username or password) must be provided" });
    }

    try {
        const updatedUser = await usersService.updateUser(id, username, password);

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await usersService.deleteUser(id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await usersService.getUserById(id);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
