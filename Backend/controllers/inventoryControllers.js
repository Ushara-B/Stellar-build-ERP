
const Inventory = require("../models/inventoryModel");

const getAllInventory = async (req, res , next) => {
    let inventories;

    //data dispaly---

    //get all inventories
    try{
        inventories = await Inventory.find();
    }catch(err){

        console.log(err);

    }

    //not found
    if(!inventories){
        return res.status(404).json({message:"inventory not found"});
    }

    //display inventories 
    return res.status(200).json({inventories});
};




//data insert--
const addInventory = async (req, res, next) =>{

    const {Name, Category, Quantity, Value, Supplier} = req.body;

    let inventories;
    try{
        inventories = new Inventory ({Name, Category, Quantity, Value, Supplier});
        await inventories.save();
    }catch (err) {
        console.log(err);
    }

    //not insert inventories
    if (!inventories){
        return res.status(404).json({message:"unable to add inventories"});
    }
    return res.status(200).json({inventories})

    };


    //get inventory by ID
const getById = async (req, res, next) => {
    const id =req.params.id;

    let inventories;

    try{
        inventories = await  Inventory.findById(id);
    }catch (err) {
        console.log(err);
    }

     //not inventories not available
     if (!inventories){
        return res.status(404).json({message:"inventory not available"});
    }
    return res.status(200).json({inventories});

    };


//update inventory details
const updateInventory = async (req, res, next) => {
    const id = req.params.id;
    const {Name, Category, Quantity, Value, Supplier} = req.body;

    let inventories;

    try {
        inventories = await Inventory.findByIdAndUpdate(id, {Name, Category, Quantity, Value, Supplier});
        inventories = await Inventory.save();
    }catch (err){
        console.log(err);
    }
    //not inventories not available
    if (!inventories){
        return res.status(404).json({message:"unable to update inventory"});
    }
    return res.status(200).json({inventories});

};


//delete inventory details
const deleteInventory = async (req, res, next) => {
    const id = req.params.id;
    const {Name, Category, Quantity, Value, Supplier} = req.body;

    let inventories;

    try {
        inventories = await Inventory.findByIdAndDelete(id, {Name, Category, Quantity, Value, Supplier});
        inventories = await Inventory.save();
    }catch (err){
        console.log(err);
    }
    
    //not inventories not available
    if (!inventories){
        return res.status(404).json({message:"Cannot delete the user"});
    }
    return res.status(200).json({inventories});


};


exports.getAllInventory = getAllInventory;
exports.addInventory = addInventory;
exports.getById = getById;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;
