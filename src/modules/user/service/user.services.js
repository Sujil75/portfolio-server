// for admin usage only
const User = require('../model/user.model');

const createUser = async data => {
    return await User.create(data);
};

const updateUser = async (data) => {
    return await User.findOneAndUpdate(
        {},
        data,
        {new: true},
    );
};

module.exports = {
    createUser,
    updateUser,
};