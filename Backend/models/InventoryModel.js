const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    Name:{
        type : String,
        required:true,
    },
    Category:{
        type : String,
        required:true,
    },

    Quantity:{
        type : Number,
        required:true,
    },

    Value:{
        type : String,
        required:true,
    },
    Supplier:{
        type : String,
        required:true,
    },
   
    
});

module.exports = mongoose.model(
   "InventoryModel", //file name
   inventorySchema //function name
)