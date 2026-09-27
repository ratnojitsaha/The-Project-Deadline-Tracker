const express = require("express");

const { getProjects , updateProject } = require("../controllers/projectController");
const validationMiddleware = require("../middleware/validationMiddleware");
const { projectUpdateSchema } = require("../validators/projectValidator");

const router = express.Router();

// GET /api/projects
router.get("/projects",getProjects);


// POST /api/project-update
router.post("/project-update",validationMiddleware(projectUpdateSchema),updateProject);


module.exports = router;