const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "..", "database.db");

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_name TEXT NOT NULL,
        deadline_date TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'In Progress',
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        project_name TEXT NOT NULL,
        status TEXT NOT NULL,
        notes TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
    );
`);

module.exports = db;