const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const payslipSchema = new Schema({
    fullName:{
        type: String,
        required:true
    },
    emp_id:{
        type:String,
        required:true

    },
    basicSalary:{
        type:Number,
        required:true,
    },
    
    tax:{
        type:Number,
        required:true,
    },
    
    netSalary:{
        type:Number,
        required:true,
    }
})

module.exports = mongoose.model('payslipModel', payslipSchema)