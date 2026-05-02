const Skills = require('../model/skills.model')

const createSkills = async data => {
    return await Skills.create(data);
};

const getSkills = async () => {
    return await Skills.find();
};

module.exports = {
    createSkills,
    getSkills,
};