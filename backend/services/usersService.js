import bcrypt from "bcrypt";
import * as usersRepository from "../repositories/usersRepository.js"

const saltRounds = 10;

export const createUser = async (username, password, role = "user") => {
    if (!username || !password) {
        throw new Error("Username and password are required");
    }

    const hashedPw = await bcrypt.hash(password, saltRounds);
    const result = await usersRepository.createUser(username, hashedPw, role);

    return result;
};

export const getUserById = async (id) => {
    const result = await usersRepository.getUserById(id);

    return result;
};

export const updateUser = async (id, username, password) => {
    const hashedPw = password ? await bcrypt.hash(password, saltRounds) : null;
    const result = await usersRepository.updateUser(id, username, hashedPw);

    return result;
};

export const deleteUser = async (id) => {
    const result = await usersRepository.deleteUser(id);

    return result;
};
