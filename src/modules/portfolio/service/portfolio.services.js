const User = require('../../user/model/user.model');
const Skills = require('../../skills/model/skills.model');
const Education = require('../../education/model/education.model');

const getPortfolio = async () => {
    const user = await User.findOne().lean();
    const skills = await Skills.findOne().lean();
    const education = await Education.findOne().lean();

    if (!user) return null;

    // return {
    //     name: user.name,
    //     email: user.email,
    //     phone: user.phone,
    //     role: user.role,
    //     description: user.description,
    //     brief_description: user.brief_description,
    //     resume: user.resume,
    //     user_image: user.user_image,
    //     skills: user.skills/* .sort((a, b) => b.skill_progress - a.skill_progress) */ || [], 
    //     // education: user.education || [],        
    // };

    return {
        ...user,
        skills,
        education,
    };
};

module.exports = {
    getPortfolio,
};