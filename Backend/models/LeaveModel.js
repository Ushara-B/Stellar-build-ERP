const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    emp_id:{
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    date:{
        type:String,
        required:true,
        trim:true,
    } ,
    type:{
        type:String,
        required:true,
        trim:true,
    } ,
    reason:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
    } ,
});

module.exports = mongoose.model('LeaveModel',leaveSchema)