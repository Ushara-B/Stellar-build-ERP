const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const inventoryCategorySchema = new Schema({
    Name:{
        type : String,
        required:true,
    },
   
});

module.exports = mongoose.model(
   "inventoryCategoryModel", //file name
   inventoryCategorySchema //function name
)