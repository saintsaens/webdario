import db from '../db-users/index.js';

const tableName = `users`;

export const createUser = async (username, hashedPw, role, sessionStartTime, lastActivityTime) => {
    const query = `
        INSERT INTO ${tableName} (username, hashed_pw, role, session_start_time, last_activity_time)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, role, session_start_time, last_activity_time, time_spent_before_current_session;
    `;
    const { rows } = await db.query(query, [username, hashedPw, role, sessionStartTime, lastActivityTime]);
    return rows[0];
};

export const getUserById = async (id) => {
    const query = `
        SELECT id, username, role, session_start_time, last_activity_time, time_spent_before_current_session
        FROM ${tableName}
        WHERE id = $1;
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

export const updateUser = async (id, { username, hashedPw, role, sessionStartTime, lastActivityTime }) => {
    const query = `
        UPDATE ${tableName}
        SET
            username = COALESCE($1, username),
            hashed_pw = COALESCE($2, hashed_pw),
            role = COALESCE($3, role),
            session_start_time = COALESCE($4, session_start_time),
            last_activity_time = COALESCE($5, last_activity_time)
        WHERE id = $6
        RETURNING id, username, role, session_start_time, last_activity_time;
    `;
    const { rows } = await db.query(query, [username, hashedPw, role, sessionStartTime, lastActivityTime, id]);
    return rows[0];
};

export const deleteUser = async (id) => {
    const query = `
        DELETE FROM ${tableName}
        WHERE id = $1
        RETURNING id, username, role, session_start_time, last_activity_time, time_spent, time_spent_before_current_session;
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
};