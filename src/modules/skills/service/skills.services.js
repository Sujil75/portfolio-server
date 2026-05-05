const Skills = require('../model/skills.model');
const User = require('../../user/model/user.model');

const createSkills = async (data) => {
    const dataArray = Array.isArray(data) ? data : [data];

    // normalize
    const normalized = dataArray.map(s => ({
        ...s,
        skill_name: s.skill_name.toLowerCase()
    }));

    // check duplicates in input
    const names = normalized.map(s => s.skill_name);
    if (new Set(names).size !== names.length) {
        throw new Error("Duplicate skills in list");
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
        throw new Error("All skills already exist");
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
    return await Skills.findByIdAndUpdate(id, data, { new: true });
};

const deleteSkill = async (id) => {
    return await Skills.findByIdAndDelete(id);
};

module.exports = {
    createSkills,
    updateSkill,
    deleteSkill,
};