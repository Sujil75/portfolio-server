const Education = require('../model/education.model');
const User = require('../../user/model/user.model');

const createEdu = async data => {
    const dataArray = Array.isArray(data) ? data : [data];

    const eduIds = dataArray.map(each => each._id);

    await User.updateMany(
        {},
        {$push: {educations: {$each: eduIds}}},
    );

    return dataArray;
}

module.exports = {
    createEdu,
};