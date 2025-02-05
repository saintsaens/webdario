import db from '../db-users/index.js';

export const createUser = async (username, hashedPw, role = "user") => {
    const query = `
        INSERT INTO users (username, hashed_pw, role)
        VALUES ($1, $2, $3)
        RETURNING id, username;
    `;
    const { rows } = await db.query(query, [username, hashedPw, role]);
    return rows[0];
};

export const getUserById = async (id) => {
    return db.query('SELECT id, username, role FROM users WHERE id = $1;', [id]);
};

export const updateUser = async (id, username, hashedPw) => {
    const queryStr = `
      UPDATE users
      SET 
        username = COALESCE($1, username),
        hashed_pw = COALESCE($2, hashed_pw)
      WHERE id = $3
      RETURNING *;
    `;
    return db.query(queryStr, [username || null, hashedPw || null, id]);
};

export const deleteUser = async (id) => {
    return db.query('DELETE FROM users WHERE id = $1 RETURNING *;', [id]);
};
