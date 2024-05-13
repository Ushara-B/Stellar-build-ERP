
const User = require("../models/userModel");

const getAllUsers = async (req, res , next) => {
    let Users;

    //data dispaly---

    //get all users
    try{
        Users = await User.find();
    }catch(err){

        console.log(err);

    }

    //not found
    if(!Users){
        return res.status(404).json({message:"user not found"});
    }

    //display users 
    return res.status(200).json({Users});
};




//data insert--
const addUsers = async (req, res, next) =>{

    const {user_N, f_Name, l_Name, dob, gender, age, m_Status, email, address, nic, role, pswrd, contact_No, f_contactNo, bank_D} = req.body;

    let users;
    try{
        users = new User ({user_N, f_Name, l_Name, dob, gender, age, m_Status, email, address, nic, role, pswrd, contact_No, f_contactNo, bank_D});
        await users.save();
    }catch (err) {
        console.log(err);
    }

    //not insert users
    if (!users){
        return res.status(404).json({message:"unable to add users"});
    }
    return res.status(200).json({users})

    };


    //get user by ID
const getById = async (req, res, next) => {
    const id =req.params.id;

    let user;

    try{
        user = await  User.findById(id);
    }catch (err) {
        console.log(err);
    }

     //not users not available
     if (!user){
        return res.status(404).json({message:"user not available"});
    }
    return res.status(200).json({user});

    };


//update user details
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {user_N, f_Name, l_Name, dob, gender, age, m_Status, email, address, nic, role, pswrd, contact_No, f_contactNo, bank_D} = req.body;

    let users;

    try {
        users = await User.findByIdAndUpdate(id, {user_N, f_Name, l_Name, dob, gender, age, m_Status, email, address, nic, role, pswrd, contact_No, f_contactNo, bank_D});
        users = await users.save();
    }catch (err){
        console.log(err);
    }
    //not users not available
    if (!users){
        return res.status(404).json({message:"unable to update user"});
    }
    return res.status(200).json({users});

};


//delete user details
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    const {user_N, f_Name, l_Name, dob, gender, age, m_Status, email, address, nic, role, pswrd, contact_No, f_contactNo, bank_D} = req.body;

    let userD;

    try {
        userD = await User.findByIdAndDelete(id, {user_N, f_Name, l_Name, dob, gender, age, m_Status, email, address, nic, role, pswrd, contact_No, f_contactNo, bank_D});
        userD = await userD.save();
    }catch (err){
        console.log(err);
    }
    
    //not users not available
    if (!userD){
        return res.status(404).json({message:"Cannot delete the user"});
    }
    return res.status(200).json({userD});


};

const login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        // Find the user by user_N or email
        const user = await User.findOne({
            $or: [{ user_N: usernameOrEmail }, { email: usernameOrEmail }],
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the password matches
        if (user.pswrd === password) {
            return res.status(200).json({ user });
        } else {
            return res.status(401).json({ error: "Incorrect password" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


exports.login = login;
exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;






