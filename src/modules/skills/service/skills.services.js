const Skills = require('../model/skills.model')

const createSkills = async data => {
    return await Skills.create(data);
};

const getSkills = async () => {
    return await Skills.find();
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
    getSkills,
    updateSkill,
    deleteSkill,
};