const Vehicle = require("../models/VehicleModel");
//data display part
const getAllVehicles = async (req, res, next) => {

    let vehicle;
    //Get all vehicle Details
    try{
        vehicle = await Vehicle.find();   
    }catch(err){
        console.log(err);
    }
    //vehicle Details not found
    if(!vehicle){
        return res.status(404).json({message:"Vehicle not found"});
    }
    //Display all Vehicle
    return res.status(200).json({ vehicle });

};

//data insert part 
const addVehicles = async(req,res,next) =>{
    const {RegNo,Vname,VIN,lic_expDay,ins_expDay,last_serviceDay,mileage, dname,vstatus} = req.body;

    let vehicle;

    try{
        vehicle = new Vehicle({RegNo,Vname,VIN,lic_expDay,ins_expDay,last_serviceDay,mileage, dname,vstatus});
        await vehicle.save();
    }catch(err){
        console.log(err);
    }
    //don't insert vehicles
    if(!vehicle){
        return res.status(404).send({message:"unable to add Vehicles"});
    }
    return res.status(200).json({vehicle
    });

};
//Get by Id
const getById = async (req, res,next) => {

    const id = req.params.id;//name is id

    let vehicle;

    try{
        vehicle = await Vehicle.findById(id);
    }catch(err) {
        console.log(err);
    } 
    //not available vehicles
    if(!vehicle){
        return res.status(404).send({message:" Vehicles Not found"});
    }
    return res.status(200).json({vehicle});
};
//Update Vehicle Details
const updateVehicle = async (req, res, next) => {
    const id = req.params.id;
    const {RegNo,Vname,VIN,lic_expDay,ins_expDay,last_serviceDay,mileage, dname,vstatus} = req.body;
    
    let vehicles;

    try{
        vehicles = await Vehicle.findByIdAndUpdate(id,
            {RegNo: RegNo,Vname: Vname,VIN: VIN,lic_expDay: lic_expDay,ins_expDay: ins_expDay,last_serviceDay: last_serviceDay,mileage: mileage, dname:dname,vstatus:vstatus });
            vehicles = await vehicles.save();
    }catch(err) {
        console.log(err);
    } 
    //not available vehicles
    if(!vehicles){
        return res.status(404).send({message:" Unable to Update Vehicles Details"});
    }
    return res.status(200).json({vehicles});
};

//Deleate Vehicle Details
const deleteVehicle = async(req, res,next) => {
    const id = req.params.id;
    let vehicle;

    try{
        vehicle = await Vehicle.findByIdAndDelete(id)   
    }catch(err) {
        console.log(err);
    } 
    //not available vehicles
    if(!vehicle){
        return res.status(404).send({message:" Unable to Delete Vehicle Details"});
    }
    return res.status(200).json({vehicle});
};


exports.getAllVehicles = getAllVehicles;
exports.addVehicles = addVehicles;
exports.getById = getById;
exports.updateVehicle = updateVehicle;
exports.deleteVehicle =deleteVehicle;