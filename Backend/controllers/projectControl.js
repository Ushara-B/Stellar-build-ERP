const Projects = require("../models/projectModel");

const getAllprojects = async (req, res, next) => {
    let project;
    try {
        project = await Projects.find();
    } catch (err) {
        console.log(err);
    }
    if (!project) {
        return res.status(404).json({ message: "No projects Found" });
    }
    return res.status(200).json({ project });

//display all projects

};

//data insert
const addprojects = async (req, res, next) => {
    const {projectName, projectBudget,Locate,contractor, Employees, Status, startDate, endDate, projectType,description } = req.body;
    let project;
    try {
        project = new Projects({
         
            
            projectName,
            projectBudget,
            Locate,
            contractor,
            Employees,
            Status,
            startDate,
            endDate,
            projectType,
            description

        });
        await project.save();
    } catch (err) {
        console.log(err);
    }
    //not insert projects
    if (!project) {
        return res.status(400).json({ message: "Unable to Add project" });
    }
    return res.status(202).json({ project });
};

//get by id

const getId = async (req, res, next) => {
   
const id = req.params.id;
let project;
try {
    project = await Projects.findById(id);

} catch (err) {
    console.log(err);
}
if (!project) {
    return res.status(404).json({ message: "No project Found" });
}
return res.status(200).json({ project });
};

//update db

const updateProjects = async (req, res, next) => {
    const id = req.params.id;
    const { projectName, projectBudget,Locate,contractor, Employees, Status, startDate, endDate, projectType,description } = req.body;
    let project;
    try {
        project = await Projects.findByIdAndUpdate(id, {
            
            
            projectName,
            projectBudget,
            Locate,
            contractor,
            Employees,
            Status,
            startDate,
            endDate,
            projectType,
            description
        });
        project = await project.save();
    } catch (err) {
        console.log(err);
    }
    if (!project) {
        return res.status(404).json({ message: "Unable to Update project" });
    }
    return res.status(200).json({ project });

};

//delete project

const deleteProjects = async (req, res, next) => {
    const id = req.params.id;
    let project;
    try {
        project = await Projects.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!project) {
        return res.status(404).json({ message: "Unable to Delete project" });
    }
    return res.status(200).json({ project });

};
   



    
exports.getAllprojects = getAllprojects;
exports.addprojects = addprojects;
exports.getId = getId;
exports.updateProjects = updateProjects;
exports.deleteProjects=deleteProjects;
