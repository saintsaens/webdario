import db from '../db-users/index.js';

const databaseName = `federated_credentials`;

export const createFederatedCredential = async (userId, provider, subject) => {
    const query = `
        INSERT INTO ${databaseName} (user_id, provider, subject)
        VALUES ($1, $2, $3)
        RETURNING id, user_id, provider, subject;
    `;
    const { rows } = await db.query(query, [userId, provider, subject]);
    return rows[0];
};

export const getFederatedCredential = async (provider, subject) => {
    const query = `
        SELECT id, user_id, provider, subject
        FROM ${databaseName}
        WHERE provider = $1 AND subject = $2;
    `;
    const { rows } = await db.query(query, [provider, subject]);
    return rows[0];
};

export const updateFederatedCredential = async (id, userId, provider, subject) => {
    const query = `
        UPDATE ${databaseName}
        SET 
            user_id = COALESCE($1, user_id),
            provider = COALESCE($2, provider),
            subject = COALESCE($3, subject)
        WHERE id = $4
        RETURNING id, user_id, provider, subject;
    `;
    const { rows } = await db.query(query, [userId || null, provider || null, subject || null, id]);
    return rows[0];
};

export const deleteFederatedCredential = async (id) => {
    const query = `
        DELETE FROM ${databaseName}
        WHERE id = $1
        RETURNING id, user_id, provider, subject;
    `;
    const {rows} = await db.query(query, [id]);
    return rows[0];
};
