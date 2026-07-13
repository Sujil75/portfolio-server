const User = require('../../user/model/user.model');

const getPortfolio = async () => {
    const user = await User.findOne()
        .populate('skills')
        .populate('educations')
        .populate('projects')
        .populate('contact_me')
        .lean();

    if (!user) return null;

    return {
        name: user.name,
        description: user.description,
        brief_description: user.brief_description,
        role: user.role,
        resume: user.resume,
        user_image_home: user.user_image_home,
        user_image_about: user.user_image_about,
        skills: (user.skills || [])/* .sort(
            (a, b) => b.skill_progress - a.skill_progress
        ) */,
         educations: (user.educations || []),
         projects: (user.projects || []),
         contact_me: (user.contact_me || []),
    };
};

module.exports = {
    getPortfolio,
};