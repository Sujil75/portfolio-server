const Education = require('../model/education.model');
const User = require('../../user/model/user.model');

module.exports.createEdu = async data => {
    if (!data) {
        const err = new Error("No Data Found");
        err.status = 404;

        throw err;
    }
    
    const dataArray = Array.isArray(data)
        ? data
        : [data];

    // Get all education names
    const names = dataArray.map(each => each.name);

    // Find existing education
    const existingEducation = await Education.find({
        name: { $in: names }
    });

    // Existing names
    const existingNames = new Set(
        existingEducation.map(each => each.name)
    );

    // Remove duplicates
    const filteredData = dataArray.filter(
        each => !existingNames.has(each.name)
    );

    // Nothing new to insert
    if (filteredData.length === 0) {
        const err = new Error("No Data Found");
        err.status = 404;

        throw err;
    }

    // Create education
    const createdEducation =
        await Education.create(filteredData);

    // Extract ids
    const educationIds =
        createdEducation.map(each => each._id);

    // Add ids to user
    await User.updateMany(
        {},
        {
            $push: {
                educations: {
                    $each: educationIds,
                },
            },
        }
    );

    return createdEducation;
};

module.exports.updateEdu = async (id, data) => {
    if (!id) {
        const err = new Error("Invalid ID: ", id);
        err.status = 415;

        throw err;
    };
    if (!data) {
        const err = new Error("Invalid Request Body");
        err.status = 415;
        
        throw err;
    };
    
    const existingData = await Education.find();
    const existingIds = existingData.map(each => each._id.toString());
    
    if (!existingIds.includes(id)) {
        const err = new Error(`Invalid ID: ${id} Found`);
        err.status = 404;
        
        throw err;
    };

    const updateEducation = await Education.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        },
    );

    if (!updateEducation) {
        const err = new Error("No Data Updated");
        err.status = 404;

        throw err;
    };

    return updateEducation;
};

module.exports.deleteEdu = async id => {
    if (!id) {
        const err = new Error("Invalid ID: ", id);
        err.status = 415;

        throw err;
    };
    
    const existingData = await Education.find();
    const existingIds = existingData.map(each => each._id.toString());
    
    if (!existingIds.includes(id)) {
        const err = new Error(`Invalid ID: ${id} Found`);
        err.status = 404;
        
        throw err;
    };


    await Education.findByIdAndDelete(id);

    await User.updateOne(
        {},
        {$pull: {
            educations: id,
        }},
    );

    return `Data with ID: ${id}, deleted successfully`;
};