const Skills = require('../model/skills.model');
const User = require('../../user/model/user.model');

const createSkills = async (data) => {
    // check if array
    const dataArray = Array.isArray(data) ? data : [data];

    // normalize data
    const names = dataArray.map(each => each.skill_name.toLowerCase());

    // check duplicates
    const unqNames = new Set(names);
    if (unqNames.size !== dataArray.length) {
        throw new Error("Duplicate skills in list");
    };

    // check duplicates in DB
    const existingSkills = await Skills.find({
        skill_name: {$in: names}
    });

    if (existingSkills.length > 0) {
        const existingNames = existingSkills.map(each => each.skill_name);
        throw new Error(`Skills already exists: ${existingNames.join(', ')}`)
    };

    const createdSkills = await Skills.create(dataArray);

    const skillsIds = createSkills.map(s => s._id);

    await User.updateMany(
        {},
        { $push: { skills: {$each: skillsIds} } },
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