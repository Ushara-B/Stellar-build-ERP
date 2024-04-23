const express = require("express");
const router = express.Router();
//insert model
const Project = require("../models/projectModel");
//insert user controller
const projectController = require("../controllers/projectControl");
router.get('/nextProjectId', (req, res) => {
    const nextId = lastProjectId + 1;
    lastProjectId = nextId;
    res.json({ nextProjectId: nextId });
  });
  router.post('/projects', (req, res) => {
    // Create a new project with the provided data and the next available project ID
    const newProject = { ...req.body, projectID: lastProjectId };
    // Save the new project to your database
    // ...
    res.json(newProject);
  });
  

router.get("/",projectController.getAllprojects);
router.post("/",projectController.addprojects);
router.get("/:id",projectController.getId);
router.put("/:id",projectController.updateProjects);
router.delete("/:id",projectController.deleteProjects);


module.exports = router;
