const Leave = require("../models/LeaveModel");

const getLeave = async(req, res, next) => {
  let leaves; 
  //get all data
  try{
    leaves = await Leave.find();
  }catch(err){
    console.log(err)
  }
  //not found
  if (!leaves) {
    return res.status(404).json({ message: "No Leaves Found" });
}
return res.status(200).json({ leaves });

};


const addLeave = async(req, res, next) => {
  const {emp_id, date, type, reason} = req.body;

  let leaves;

  try{
    leaves = new Leave({emp_id, date, type, reason});
    await leaves.save();
  }catch(err){
    console.log(err);
  }
  if (!leaves) {
    return res.status(404).json({ message: "unable to add leave" });
}
return res.status(200).json({ leaves });


};

const getById = async(req, res, next) => {

  const id = req.params.id;

  let leaves;

  try{
    leaves = await Leave.findById(id);
  }catch(err){
    console.log(err);
  } 
  if (!leaves) {
    return res.status(404).json({ message: "Not found" });
}
return res.status(200).json({ leaves });

}

const updateLeave = async(req, res, next) => {

  const id = req.params.id;
  const { emp_id, date, reason, type } = req.body;
  let leaves;

  try{
    leaves = await Leave.findByIdAndUpdate(id,
    {emp_id:emp_id , date:date, type:type, reason:reason});
    leaves = await Leave.save();
  }catch(err){
    console.log(err);
  }

  if (!leaves) {
    return res.status(404).json({ message: "Unable to update" });
}
return res.status(200).json({ leaves });

};

const deleteLeave = async(req, res, next) => {
  const id = req.params.id;
  let leaves;

  try{
    leaves = await Leave.findByIdAndDelete(id);
  }catch(err){
    console.log(err);
  }

  if (!leaves) {
    return res.status(404).json({ message: "Unable to delete" });
}
return res.status(200).json({ leaves });
};

exports.getLeave = getLeave;
exports.addLeave = addLeave;
exports.updateLeave = updateLeave;
exports.deleteLeave = deleteLeave;
exports.getById = getById;
