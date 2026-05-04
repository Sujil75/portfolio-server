const Skills = require('../model/skills.model')
const User = require('../../user/model/user.model')

const createSkills = async data => {
    const skill = await Skills.create(data);

    await User.findOneAndUpdate(
        {},
        {$push: {skills: skill._id}},
    );

    return skill;
};

const updateSkill = async (id, data) => {
    return await Skills.findByIdAndUpdate(
        id,
        data,
        {new: true},
    );
};

const deleteSkill = async id => {
    return await Skills.findByIdAndDelete(id);
};

module.exports = {
    createSkills,
    updateSkill,
    deleteSkill,
};