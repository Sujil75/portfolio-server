const Projects = require('../model/project.model');
const User = require('../../user/model/user.model');

module.exports.createProject = async data => {
    const dataArray = Array.isArray(data) ? data : [data];

    const normalizedData = dataArray.map(each => each.project_name.trim());

    const existingData = await Projects.find({
        project_name: {$in: normalizedData},
    });

    const existingNames = new Set(
        existingData.map(each => (
            each.project_name.trim()
        ))
    );

    const filteredData = dataArray.filter(each =>
        !existingNames.has(
            each.project_name.trim()
        )
    );

    const formattedData = filteredData.map(each => ({
        ...each,
        project_name: each.project_name.trim(),
    }));

    if (formattedData.length === 0) {
        return [];
    };

    const createdData = await Projects.create(formattedData);

    const projectIds = createdData.map(each => each._id);
    
    await User.updateMany(
        {},
        {$push: {projects: {$each: projectIds}}},
    );

    return createdData;
};

module.exports.updateProject = async (id, data) => {
    if (!id) throw new Error("Invalid ID: ", id);
    if (!data) throw new Error ("Invalid Data Found");

    const getData = await Projects.findById(id);

    if (getData.project_name === data.project_name.trim()) 
        throw new Error(`Project data didn't update as project names are same`);

    const updateData = await Projects.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        }
    );

    return updateData;
};

module.exports.deleteProject = async id => {
    if (!id) throw new Error("Invalid Project ID: ", id);

    const deleteId = await Projects.findByIdAndDelete(id);

    await User.updateOne(
        {},
        {$pull: {
            projects: id,
        }},
    );

    return deleteId;
};