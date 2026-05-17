const Admin = require('../model/admin.model');

module.exports.registerAdmin = async data => {
    if (!data) throw new Error("Invalid Data Found");

    const createAdmin = await Admin.create(data);

    return createAdmin;
};