const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    Name:{
        type : String,
        required:true,
    },
   
});

module.exports = mongoose.model(
   "categoryModel", //file name
   categorySchema //function name
)