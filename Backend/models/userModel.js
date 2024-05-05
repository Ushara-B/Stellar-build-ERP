const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_N: {
        type: String,
        required: true,
    },
    f_Name: {
        type: String,
        required: true,
    },
    l_Name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    m_Status: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    pswrd: {
        type: String,
        required: true,
    },
    contact_No: {
        type: String,
        required: true,
    },
    f_contactNo: {
        type: String,
        required: true,
    },
    bank_D: {
        type: String,
        required: true,
    },
});

// Hash password before saving user
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified("pswrd")) {
        return next();
    }

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password along with our new salt
        const hashedPassword = await bcrypt.hash(this.pswrd, salt);
        // Override the plain text password with the hashed one
        this.pswrd = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("UserModel", userSchema);
