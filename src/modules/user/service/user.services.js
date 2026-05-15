const User = require('../model/user.model');

const createUser = async (data) => {
    return await User.create(data);
};

const updateUser = async (data) => {
    if (!data) throw new Error("Invalid Data Found");

    const user = await User.findOneAndUpdate({}, data, { new: true });

    if (!user) {
        throw new Error('User not updated');
    }

    return user;
};

module.exports = {
    createUser,
    updateUser,
};