
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
const addCategory = async (req, res, next) =>{

    const {Name, Quantity, Value, Supplier} = req.body;

    let categories;
    try{
        categories = new Category ({Name, Quantity, Value, Supplier});
        await categories.save();
    }catch (err) {
        console.log(err);
    }

    //not insert categories
    if (!categories){
        return res.status(404).json({message:"unable to add categories"});
    }
    return res.status(200).json({categories})

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


//update Category  details
const updateCategory  = async (req, res, next) => {
    const id = req.params.id;
    const {Name,  Quantity, Value, Supplier} = req.body;

    let categories;

    try {
        categories = await Category.findByIdAndUpdate(id, {Name, Quantity, Value, Supplier});
        categories = await Category.save();
    }catch (err){
        console.log(err);
    }
    //not categories not available
    if (!categories){
        return res.status(404).json({message:"unable to update Category"});
    }
    return res.status(200).json({categories});

};


//delete Category  details
const deleteCategory  = async (req, res, next) => {
    const id = req.params.id;
    const {Name, Quantity, Value, Supplier} = req.body;

    let categories;

    try {
        categories = await Category.findByIdAndDelete(id, {Name, Quantity, Value, Supplier});
        categories = await Category.save();
    }catch (err){
        console.log(err);
    }
    
    //not categories not available
    if (!categories){
        return res.status(404).json({message:"Cannot delete the user"});
    }
    return res.status(200).json({categories});


};


exports.getAllCategory = getAllCategory;
exports.addCategory = addCategory;
exports.getById = getById;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
