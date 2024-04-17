const Attendance = require("../models/attendanceModel");

const getAttendance = async(req, res, next) => {
    let attendances; 
    //get all data
    try{
      attendances = await Attendance.find();
    }catch(err){
      console.log(err)
    }
    //not found
    if (!attendances) {
      return res.status(404).json({ message: "No Leaves Found" });
  }
  return res.status(200).json({ attendances });
  
  };

  const addAttendance = async(req, res, next) => {
    const {emp_id, date, clock_in, clock_out} = req.body;
  
    let attendances;
  
    try{
      attendances = new Attendance({emp_id, date, clock_in, clock_out});
      await attendances.save();
    }catch(err){
      console.log(err);
    }
    if (!attendances) {
      return res.status(404).json({ message: "unable to add leave" });
  }
  return res.status(200).json({ attendances });
}

const getById = async(req, res, next) => {

  const id = req.params.id;

  let attendances;

  try{
    attendances = await Attendance.findById(id);
  }catch(err){
    console.log(err);
  } 
  if (!attendances) {
    return res.status(404).json({ message: "Not found" });
}
return res.status(200).json({ attendances });

}


  exports.getAttendance = getAttendance;
  exports.addAttendance = addAttendance;
  exports.getById = getById;