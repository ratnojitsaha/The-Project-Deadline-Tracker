const db = require("../config/database");

const getAllProjects = () => {
    return db.prepare(`
        SELECT *
        FROM projects
        ORDER BY deadline_date ASC
    `).all();
};

const getProjectById = (id) => {
    return db.prepare(`
        SELECT *
        FROM projects
        WHERE id = ?
    `).get(id);
};

const updateProject = (id, status) => {
    return db.prepare(`
        UPDATE projects
        SET status = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(status, id);
};

module.exports = {
    getAllProjects,
    getProjectById,
    updateProject
};