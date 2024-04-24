const payslip = require("../models/payslipModel");

const getPayslip = async(req, res, next) => {
    let slip; 
    try{
        slip = await payslip.find();
    }catch(err){
      console.log(err)
    }
    if (!slip) {
      return res.status(404).json({ message: "No Leaves Found" });
  }
  return res.status(200).json({ slip });
  
  };

  const addPayslip = async(req, res, next) => {
    const {fullName, emp_id, basicSalary, OT, tax, insuarance, netSalary} = req.body;
  
    let slip;
  
    try{
        slip = new payslip({fullName, emp_id, basicSalary, OT, tax, insuarance, netSalary});
      await slip.save();
    }catch(err){
      console.log(err);
    }
    if (!slip) {
      return res.status(404).json({ message: "unable to add leave" });
  }
  return res.status(200).json({ slip });
  
  
  };
  
  const getById = async(req, res, next) => {
  
    const id = req.params.id;
  
    let slip;
  
    try{
        slip = await payslip.findById(id);
    }catch(err){
      console.log(err);
    } 
    if (!slip) {
      return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ slip });
  
  }

  exports.getPayslip = getPayslip;
  exports.addPayslip =addPayslip;
  exports.getById = getById;