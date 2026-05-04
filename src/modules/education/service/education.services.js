const Education = require('../model/education.model');

const createEdu = async data => {
    return await Education.create(data);
}

module.exports = {
    createEdu,
};