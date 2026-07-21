const Skills = require('../model/skills.model');
const User = require('../../user/model/user.model');

const createSkills = async (data) => {
    if (!data) {
        const err = new Error("No Data Found");
        err.status = 404;

        throw err;
    }
    
    const dataArray = Array.isArray(data) ? data : [data];

    // normalize
    const normalized = dataArray.map(s => ({
        ...s,
        skill_name: s.skill_name
    }));

    // check duplicates in input
    const names = normalized.map(s => s.skill_name);
    if (new Set(names).size !== names.length) {
        const err = new Error("Duplicate skills in list");
        err.status = 409;
        
        throw err;
    }

    // check duplicates in DB
    const existingSkills = await Skills.find({
        skill_name: { $in: names }
    });

    // remove already existing skills
    const existingNames = new Set(
        existingSkills.map(s => s.skill_name)
    );

    const filteredData = normalized.filter(
        s => !existingNames.has(s.skill_name)
    );

    if (filteredData.length === 0) {
        const err = new Error("All skills already exist");
        err.status = 409;
        
        throw err;
    }

    // create only new ones
    const createdSkills = await Skills.create(filteredData);

    const skillsIds = createdSkills.map(s => s._id);

    await User.updateMany(
        {},
        { $push: { skills: { $each: skillsIds } } }
    );

    return createdSkills;
};

const updateSkill = async (id, data) => {
    if (!id) {
        const err = new Error("Invalid ID: ", id);
        err.status = 404;

        throw err;
    };
    if (!data) {
        const err = new Error("Invalid Request Body");
        err.status = 415;
        
        throw err;
    };

    const existingData = await Skills.find();
    const existingIds = existingData.map(each => each._id.toString());
    
    if (!existingIds.includes(id)) {
        const err = new Error(`Invalid ID: ${id} Found`);
        err.status = 415;
        
        throw err;
    };

    const updateData = await Skills.findByIdAndUpdate(
        id, 
        data, 
        { 
            new: true,
            runValidators: true,
         }
    );

    if (!updateData) {
        const err = new Error("No Data Updated");
        err.status = 400;
        
        throw err;
    };

    return updateData;
};

const deleteSkill = async (id) => {
    if (!id) {
        const err = new Error("Invalid ID: ", id);
        err.status = 404;

        throw err;
    };

    const existingData = await Skills.find();
    const existingIds = existingData.map(each => each._id.toString());
    
    if (!existingIds.includes(id)) {
        const err = new Error(`Invalid ID: ${id} Found`);
        err.status = 415;
        
        throw err;
    };

    await Skills.findByIdAndDelete(id);

    await User.updateOne(
        {},
        {$pull: {skills: id}},
    )

    return `Data with ID: ${id}, deleted successfully`;
};

module.exports = {
    createSkills,
    updateSkill,
    deleteSkill,
};