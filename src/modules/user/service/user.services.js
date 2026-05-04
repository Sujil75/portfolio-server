const User = require('../model/user.model');

const createUser = async (data) => {
    return await User.create(data);
};

const updateUser = async (data) => {
    const user = await User.findOneAndUpdate({}, data, { new: true });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

module.exports = {
    createUser,
    updateUser,
};