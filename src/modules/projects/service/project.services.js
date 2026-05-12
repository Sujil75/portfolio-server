const Projects = require('../model/project.model');
const User = require('../../user/model/user.model');

module.exports.createProject = async data => {
    const dataArray = Array.isArray(data) ? data : [data];

    const normalizedData = dataArray.map(each => each.project_name.trim().toLowerCase());

    const existingData = await Projects.find({
        projects_name: {$in: normalizedData.trim().toLowerCase()},
    });

    const existingNames = new Set(
        existingData.map(each => (
            each.projects_name.trim().toLowerCase()
        ))
    );

    const filteredData = dataArray.filter(each => (
        !existingNames.has(each.project_name.trim().toLowerCase())
    ));

    const formattedData = filteredData.map(each => ({
        ...each,
        project_name: eacch.project_name.trim().toLowerCase(),
    }));

    const createdData = await Projects.create(formattedData);

    const projectIds = createdData.map(each => each._id);
    
    await User.updateMany(
        {},
        {$push: {projects: {$each: projectIds}}},
    );

    return createdData;
};