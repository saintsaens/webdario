import db from '../db-users/index.js';

const tableName = `users`;

export const createUser = async (username, hashedPw, role) => {
    const query = `
        INSERT INTO ${tableName} (username, hashed_pw, role, session_start_time, last_activity_time, time_spent)
        VALUES ($1, $2, $3, NOW(), NOW(), INTERVAL '0')
        RETURNING id, username, role, session_start_time, last_activity_time, time_spent;
    `;
    const { rows } = await db.query(query, [username, hashedPw, role]);
    return rows[0];
};

export const getUserById = async (id) => {
    const query = `
        SELECT id, username, role, session_start_time, last_activity_time, time_spent
        FROM ${tableName}
        WHERE id = $1;
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

export const updateUser = async (id, username, hashedPw, sessionStartTime, lastActivityTime, timeSpent) => {
    const query = `
        UPDATE ${tableName}
        SET 
            username = COALESCE($1, username),
            hashed_pw = COALESCE($2, hashed_pw),
            session_start_time = COALESCE($3, session_start_time),
            last_activity_time = COALESCE($4, last_activity_time),
            time_spent = COALESCE($5, time_spent)
        WHERE id = $6
        RETURNING id, username, role, session_start_time, last_activity_time, time_spent;
    `;
    const { rows } = await db.query(query, [username || null, hashedPw || null, sessionStartTime || null, lastActivityTime || null, timeSpent || null, id]);
    return rows[0];
};

export const deleteUser = async (id) => {
    const query = `
        DELETE FROM ${tableName}
        WHERE id = $1
        RETURNING id, username, role, session_start_time, last_activity_time, time_spent;
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
};