const projectModel= require("../models/projectModel")
const slugify =  require('slugify')


exports.addProject = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingproject = await projectModel.findOne({ name });
    if (existingproject) {
      return res.status(200).send({
        success: false,
        message: "project Already Exisits",
      });
    }
    const project = await new projectModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new project created",
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      errro,
      message: "Errro in project",
    });
  }
};

//update project
exports.updateproject = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const project = await projectModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "project Updated Successfully",
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating project",
    });
  }
};

// get all cat
exports.getProjects = async (req, res) => {
  try {
    const project = await projectModel.find({});
    res.status(200).send({
      success: true,
      message: "All project List",
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Projects",
    });
  }
};

// single project
exports.singleproject = async (req, res) => {
  try {
    const project = await projectModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle project SUccessfully",
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single project",
    });
  }
};

//delete project
exports.deleteproject = async (req, res) => {
  try {
    const { id } = req.params;
    await projectModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "project Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting project",
      error,
    });
  }
};