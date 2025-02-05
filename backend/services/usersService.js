import bcrypt from "bcrypt";
import * as usersRepository from "../repositories/usersRepository.js"

const saltRounds = 10;

export const createUser = async (username, password, role = "user") => {
    const hashedPassword = password;
    const result = await usersRepository.createUser(username, hashedPassword, role);

    return result.rows;
};

export const getUserById = async (id) => {
    const result = await usersRepository.getUserById(id);

    return result.rows[0];
};

export const updateUser = async (id, username, password) => {
    const hashedPw = password ? await bcrypt.hash(password, saltRounds) : null;
    const result = await usersRepository.updateUser(id, username, hashedPw);

    return result.rows[0];
};

export const deleteUser = async (id) => {
    const result = await usersRepository.deleteUser(id);

    return result.rows[0];
};
