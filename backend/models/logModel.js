const db = require("../config/database");

const createLog = (projectId, projectName, status, notes) => {
    return db.prepare(`
        INSERT INTO logs (
            project_id,
            project_name,
            status,
            notes
        )
        VALUES (?, ?, ?, ?)
    `).run(
        projectId,
        projectName,
        status,
        notes || ""
    );
};

const getLatestLogs = () => {
    return db.prepare(`
        SELECT *
        FROM logs
        ORDER BY updated_at DESC, id DESC
        LIMIT 10
    `).all();
};

module.exports = {
    createLog,
    getLatestLogs
};