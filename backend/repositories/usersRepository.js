import db from '../db-users/index.js';

const databaseName = `users`;

export const createUser = async (username, hashedPw, role) => {
    const query = `
        INSERT INTO ${databaseName} (username, hashed_pw, role)
        VALUES ($1, $2, $3)
        RETURNING id, username, role;
    `;
    const { rows } = await db.query(query, [username, hashedPw, role]);
    return rows[0];
};

export const getUserById = async (id) => {
    const query = `
        SELECT id, username, role
        FROM ${databaseName}
        WHERE id = $1;
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

export const updateUser = async (id, username, hashedPw) => {
    const query = `
        UPDATE ${databaseName}
        SET 
            username = COALESCE($1, username),
            hashed_pw = COALESCE($2, hashed_pw)
        WHERE id = $3
        RETURNING id, username, role;
    `;
    const { rows } = await db.query(query, [username || null, hashedPw || null, id]);
    return rows[0];
};

export const deleteUser = async (id) => {
    const query = `
        DELETE FROM ${databaseName}
        WHERE id = $1
        RETURNING id, username, role;
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
};
