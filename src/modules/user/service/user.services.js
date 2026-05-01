const User = require('../model/user.model');

const createUser = async data => {
    return await User.create(data);
};

const getUser = async () => {
    return await User.find();
}

module.exports = {
    createUser,
    getUser,
};