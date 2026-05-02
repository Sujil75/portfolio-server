const Education = require('../model/education.model');

const createEdu = async data => {
    return await Education.create(data);
}

const getEdu = async () => {
    return await Education.find();
}

module.exports = {
    createEdu,
    getEdu
};