const mongoose = require("mongoose");
const SchemaProject = mongoose.Schema;

const projectSchema = new SchemaProject({
    
    
    projectID: {
        type: String,
        required: true,
        trim:true,
        maxLength:50
    },
    projectName: {
        type: String,
        required: true,
    },
    projectBudget: {
        type: Number,
        required: true,
        trim:true,
        maxLength:50
    },
    
    Locate: {
        type: String,
        required: true,
        trim:true,
        maxLength:50
    },
    contractor: {
        type: String,
        required: true,
        trim:true,
        maxLength:50
    },
   
   
 
    Employees: {
        type: String,
        required: true,
        trim:true,
        maxLength:50
    },
    
    Status: {
        type: String,
        required: true,
        trim:true,
        maxLength:50
    },
  
    startDate: {
        type: Date,
        required: true,
        trim:true,
        
    },
    
    endDate: {
        type: Date,
        required: true,
        trim:true,
        
    },
    
    projectType: {
        type: String,//data type
        required: true,//variable
        trim:true,
        maxLength:50
    },
    description : {
        type: String,
        required: true,
        trim:true,
        
    },
});

module.exports = mongoose.model(
"projectModel", //file name
projectSchema //function name
)