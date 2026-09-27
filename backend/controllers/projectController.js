const projectModel = require("../models/projectModel");
const logModel = require("../models/logModel");


const getProjects = (req, res, next) => {

    try{

        const projects =
            projectModel.getAllProjects();

        res.status(200).json(projects);

    }catch(error){
        next(error);
    }
};


const updateProject = (req, res, next) => {

    try{

        const {
            project_id,
            status,
            notes
        } = req.body;


        const project = projectModel.getProjectById(project_id);


        if (!project) {

            return res.status(404).json({
                message: "Project not found"
            });

        }


        projectModel.updateProject(
            project_id,
            status
        );


        logModel.createLog(
            project_id,
            project.project_name,
            status,
            notes
        );


        const updatedProject = projectModel.getProjectById(project_id);


        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject
        });


    }catch(error){
        next(error);
    }
};


module.exports = {
    getProjects,
    updateProject
};