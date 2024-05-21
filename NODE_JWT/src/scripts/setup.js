const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
    try {
        const existingAdmin = await User.findOne({ email:'admin@test.com' });
        if (existingAdmin){
            console.log("admin account already exist");

        }
        else{
           const newAdmin = new User({
                firstName: "Admin",
                lastName: "123",
                email: "admin@test.com",
                password: await bcrypt.hash("admin",10),
                role: "admin" 
            });
            await newAdmin.save();
            console.log("admin account created successfully");
        }

    } catch (error) {
        console.error(error.message);
    }
};

module.exports = { createAdminAccount };

