
const Category = require("../models/categoryModel");

const getAllCategory = async (req, res , next) => {
    let categories;

    //data dispaly---

    //get all categories
    try{
        categories = await Category.find();
    }catch(err){

        console.log(err);

    }

    //not found
    if(!categories){
        return res.status(404).json({message:"Category not found"});
    }

    //display categories
    return res.status(200).json({categories});
};




//data insert--
const addCategory = async (req, res, next) => {
    const { Name } = req.body;
  
    let existingCategory;
  
    // Check if a category with the same name already exists
    try {
      existingCategory = await Category.findOne({ Name });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Checking for existing category failed, please try again" });
    }
  
    if (existingCategory) {
      // If a category with the same name already exists, return a conflict response
      return res.status(409).json({ message: 'Category already exists' });
    }
  
    let newCategory;
  
    // If a category with the same name doesn't exist, add the new category
    try {
      newCategory = new Category({
        Name
      });
  
      await newCategory.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Creating category failed, please try again" });
    }
  
    return res.status(201).json({ category: newCategory });
  };


    //get Category  by ID
const getById = async (req, res, next) => {
    const id =req.params.id;

    let categories;

    try{
        categories = await  Category.findById(id);
    }catch (err) {
        console.log(err);
    }

     //not categories not available
     if (!categories){
        return res.status(404).json({message:"Category  not available"});
    }
    return res.status(200).json({categories});

    };



exports.getAllCategory = getAllCategory;
exports.addCategory = addCategory;
exports.getById = getById;
