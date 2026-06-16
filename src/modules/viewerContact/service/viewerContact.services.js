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

const getContact = async () => {
    const contact = await ViewContact.find();

    if (contact === undefined) {
        throw new Error("Error in fetching Viewer Contacts");
    } else if (contact.length < 1) {
        return {
            message: "No Viewer Data to display, let the mails come",
        };
    };

    return contact;
};

const deleteContact = async id => {
    if (!id) throw new Error("ID not defined");

    const existingContacts = await ViewContact.find();
    const existingIds = existingContacts.map(each => each._id.toString());

    if (!existingIds.includes(id)) throw new Error(`Invalid ID: ${id} found`);

    await ViewContact.findByIdAndDelete(id);

    return {
        message: "Contact Deleted Successfully",
    };
};

module.exports = {
    createContact,
    getContact,
    deleteContact,
};