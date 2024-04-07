const Inventory = require("../models/InventoryModel");

const getAllInventory = async(req, res, next) => {

    let Inventories;
    try{
        inventories = await Inventory.find();

    }catch(err) {
        console.log(err);
    }
    //not inventory
    if(!inventories){
        return res.status(404).json({message:"Not inventories yet"});
    }

    //Display all inventories
    return res.status(200).json({ inventories });
};

//data insert
const addProduct= async (req, res) => {
    const{name, category, quantity, discription, suppliers} = req.body;

    let inventories;

    try{
        inventories = new Inventory({name, category, quantity, discription, suppliers});
        await inventories.save();

    }catch (err){
        console.log(err);
    }

    //Validation not insert inventory
    if (!inventories) {
        return res.status(400).json({message:"Unable to add inventories"});
      }
      return res.status(200).json({inventories});
};

// get product By Id
const getById = async(req,res, next) =>{

    const id = req.params.id;

    let inventories;
    try {
        inventories = await Inventory.findById(id);   
    } catch (err) {
        console.log(err);
        
    }

    // not available inventory
    if (!inventories) {
        return res.status(400).json({message:"inventory not found"});
      }
      return res.status(200).json({inventories});   
}

//Update inventory details
const updateInventory = async (req, res, next) =>{
    const id = req.params.id;
    const{name, category, quantity, discription, suppliers} = req.body;

    let inventories;

    try {
        inventories = await Inventory.findByIdAndUpdate(id,
            {name: name, category: category, quantity: quantity, discription: discription, suppliers: suppliers});
            inventories = await inventories.save();
    } catch (err) {
        console.log(err);    
    }
    if (!inventories) {
        return res.status(400).json({message:"Unable to update inventory Details"});
      }
      return res.status(200).json({inventories}); 
}

//delete inventory
const deleteInventory = async (req, res, next) =>{
    const id = req.params.id;
    let inventories;

   try {
    inventories = await Inventory.findByIdAndDelete(id);
    
   } catch (err) {
    console.log(err);    
   }


if (!inventories) {
    return res.status(400).json({message:"Unable to delete inventory Details"});
  }
  return res.status(200).json({inventories}); 
        



}



module.exports ={
    addProduct,
    getAllInventory,
    getById,
    updateInventory,
    deleteInventory,

}