const db = require("../config/database");

const projects = [
    {
        project_name: "Website Redesign",
        deadline_date: "2026-09-25",
        status: "In Progress"
    },
    {
        project_name: "Mobile Application",
        deadline_date: "2026-10-05",
        status: "In Progress"
    },
    {
        project_name: "Backend API",
        deadline_date: "2026-09-20",
        status: "Completed"
    },
    {
        project_name: "Database Migration",
        deadline_date: "2026-10-15",
        status: "In Progress"
    },

    // 5 additional projects
    {
        project_name: "Cloud Deployment",
        deadline_date: "2026-09-27",
        status: "Completed"
    },
    {
        project_name: "Payment Gateway Integration",
        deadline_date: "2026-09-27",
        status: "Completed"
    },
    {
        project_name: "Admin Dashboard",
        deadline_date: "2026-10-12",
        status: "In Progress"
    },
    {
        project_name: "User Authentication Module",
        deadline_date: "2026-09-22",
        status: "In Progress"
    },
    {
        project_name: "Analytics Integration",
        deadline_date: "2026-09-18",
        status: "In Progress"
    }
];

const insertProject = db.prepare(`
    INSERT INTO projects (
        project_name,
        deadline_date,
        status
    )
    VALUES (?, ?, ?)
`);

const insertMany = db.transaction((projects) => {
    for (const project of projects) {
        insertProject.run(
            project.project_name,
            project.deadline_date,
            project.status
        );
    }
});

insertMany(projects);

console.log("Projects seeded successfully.");