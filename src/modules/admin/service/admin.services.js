const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.registerAdmin = async data => {
    const existingAdmin = await Admin.findOne();

    if (!existingAdmin) throw new Error("Data Not Found");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const newData = {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        admin: data.admin,
    };
    
    const createAdmin = await Admin.create(newData);

    return createAdmin;
};

module.exports.loginAdmin = async ({email, password}) => {
    const admin = await Admin.findOne({email});
    
    if (!admin) throw new Error("No Admin With given details found");

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) throw new Error("Invalid Password");

    const token = jwt.sign({
        "id": admin._id,
        "email": admin.email,
        "role": "admin",
    }, process.env.JWT_SECRET, {
        "expiresIn": '1d',
    });

    return {
        token,
        admin,
    }
};

module.exports.updateAdminPassword = async ({oldPassword, newPassword}) => {
    oldPassword = oldPassword.trim();
    newPassword = newPassword.trim();

    const adminData = await Admin.findOne();
    
    const isMatch = await bcrypt.compare(oldPassword, adminData.password);
    
    if (!isMatch) throw new Error("Old Password does not match");

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedAdmin = await Admin.updateOne(
        {},
        {$set: {
            password: newHashedPassword,
        }},
    );

    return "Admin Password Updated Successfully";
};