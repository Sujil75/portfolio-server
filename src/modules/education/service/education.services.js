const Education = require('../model/education.model');
const User = require('../../user/model/user.model');

module.exports.createEdu = async data => {
    // get user data
    const dataArray = Array.isArray(data) ? data : [data];

    // normalize user data
    const normalizedData = dataArray.map(each => each.education_name.trim().toLowerCase());

    // get existing data
    const existingData = await Education.find({
        "education_name": {$in: normalizedData}
    });

    // get education names from existing data
    const existingNames = new Set(
        existingData.map(each => 
            each.education_name.trim().toLowerCase()
        )
    );

    // filter data removing duplicates
    const filteredData = dataArray.filter(each => 
        !existingNames.has(each.education_name.trim().toLowerCase())
    );

    // normalize before insert
    const formattedData = filteredData.map(each => ({
        ...each,
        education_name: each.education_name.trim().toLowerCase(),
    }));

    // new education data
    const createdData = await Education.create(formattedData);

    // get education ids for user collection
    const eduIds = createdData.map(each => each._id);

    // push into user collection
    await User.updateMany(
        {},
        {$push: {educations: {$each: eduIds}}},
    );

    return createdData;
}

module.exports.updateEdu = async (id, data) => {
    const updateEducation = await Education.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        },
    );

    if (!updateEducation) throw new Error(`No data found or empty`)

    return updateEducation;
};

module.exports.deleteEdu = async id => {
    const deleteId = await Education.findByIdAndDelete(id);

    if (!deleteId) throw new Error(`No data found or empty`);

    await User.updateOne(
        {},
        {$pull: {
            educations: id,
        }},
    );

    return deleteId;
};