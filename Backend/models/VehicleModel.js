const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    RegNo:{//Registration number or license plate
        type:String,//dataType
        required:true,//validate
    },
    Vname:{
        type:String,//dataType
        required:true,//validate
    },
    VIN:{//Vehicle Identification Number
        type:String,//dataType
        required:true,//validate
    },
    lic_expDay: {
        type: Date,
        required: true,
    },
    ins_expDay: {//Expiration date of vehicle insurance
        type: Date,
        required: true,
    },
    last_serviceDay: {
        type: Date,
        required: true,
    },
    mileage:{
        type:String,//dataType
        required:true,//validate
    },
    dname:{
        type:String,//dataType
        required:true,//validate
    },
    vstatus:{
        type:String,//dataType
        required:true,//validate
    }
});

module.exports = mongoose.model(
    "VehicleModel",//file name
    vehicleSchema //function name
);
