const User = require('../../user/model/user.model');

const getPortfolio = async () => {
    const user = await User.findOne()
        .populate('skills')
        .populate('educations')
        .lean();

    if (!user) return null;

    return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        description: user.description,
        brief_description: user.brief_description,
        resume: user.resume,
        user_image: user.user_image,
        skills: (user.skills || [])/* .sort(
            (a, b) => b.skill_progress - a.skill_progress
        ) */,
         educations: (user.educations || []),
    };
};

module.exports = {
    getPortfolio,
};