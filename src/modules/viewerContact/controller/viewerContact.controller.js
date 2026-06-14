const { createContact } = require('../service/viewerContact.services');

const submitContact = async (req, res) => {
    try {
        const viewerContact = await createContact(req.body);

        res.status(200).json({
            message: "Mail Send Successfully"
        });
    } catch(err) {
        res.status(err.status || 500).json({
            status: err.status,
            message: err.message,
        })
    }
};

module.exports = {
    submitContact,
}