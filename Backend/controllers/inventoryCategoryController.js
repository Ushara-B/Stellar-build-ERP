
const ICategory = require("../models/inventoryCategoryModel");

const getAllICategory = async (req, res , next) => {
    let iCategories;

    //data dispaly---

    //get all iCategories
    try{
      iCategories = await ICategory.find();
    }catch(err){

        console.log(err);

    }

    //not found
    if(!iCategories){
        return res.status(404).json({message:"inventory not found"});
    }

    //display iCategories 
    return res.status(200).json({iCategories});
};




//data insert--
const addICategory = async (req, res, next) =>{

    const {Name} = req.body;

    let iCategories;
    try{
      iCategories = new ICategory ({Name});
        await iCategories.save();
    }catch (err) {
        console.log(err);
    }

    //not insert iCategories
    if (!iCategories){
        return res.status(404).json({message:"unable to add categories"});
    }
    return res.status(200).json({iCategories})

    };


    //get inventoryCategory by ID
const getById = async (req, res, next) => {
    const id =req.params.id;

    let iCategories;

    try{
      iCategories = await  ICategory.findById(id);
    }catch (err) {
        console.log(err);
    }

     //not inventories not available
     if (!iCategories){
        return res.status(404).json({message:"category not available"});
    }
    return res.status(200).json({iCategories});

    };


//update inventory details
const updateICategory = async (req, res, next) => {
    const id = req.params.id;
    const {Name} = req.body;

    let iCategories;

    try {
      iCategories = await ICategory.findByIdAndUpdate(id, {Name});
      iCategories = await ICategory.save();
    }catch (err){
        console.log(err);
    }
    //not inventories not available
    if (!iCategories){
        return res.status(404).json({message:"unable to update category"});
    }
    return res.status(200).json({iCategories});

};


//delete inventory details
const deleteICategory = async (req, res, next) => {
    const id = req.params.id;
    const {Name} = req.body;

    let iCategories;

    try {
      iCategories = await Inventory.findByIdAndDelete(id, {Name});
      iCategories = await Inventory.save();
    }catch (err){
        console.log(err);
    }
    
    //not iCategories not available
    if (!iCategories){
        return res.status(404).json({message:"Cannot delete the category"});
    }
    return res.status(200).json({iCategories});


};


exports.getAllICategory = getAllICategory;
exports.addICategory = addICategory;
exports.getById = getById;
exports.deleteICategory = deleteICategory;
