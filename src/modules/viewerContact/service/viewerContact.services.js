const ViewContact = require('../../viewerContact/model/viewerContact.model');
const {sendContactMail} = require('./mail.services');

const createContact = async data => {
    const savedContact = await ViewContact.create(data);

    await sendContactMail(data);

    return {
        message: "Mail Send",
        data: savedContact,
    };
};

module.exports = {
    createContact,
};