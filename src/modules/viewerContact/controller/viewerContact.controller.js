const { 
    createContact, 
    getContact,
    deleteContact,
} = require('../service/viewerContact.services');

const submitContact = async (req, res, next) => {
    try {
        // console.log("CONTENT-TYPE:", req.headers["content-type"]);
        // console.log("BODY:", req.body);
        const data = req.body;

        if (Object.keys(data).length === 0) {
            const err = new Error("Request body missing");
            err.status = 400;

            throw err;
        };

        // console.log(data);
        
        await createContact(data);

        return res.status(200).json({
            message: "Mail Send Successfully"
        });
    } catch(err) {
        err.code = 11000;

        next(err);
    }
};

const getViewersContact = async (req, res, next) => {
    try {
        const viewerContact = await getContact();

        return res.status(200).send(viewerContact);
    } catch (err) {
        next(err);
    };
}

const deleteViewerContact = async (req, res, next) => {
    try {
        const viewerContact = await deleteContact(req.params.id);

        return res.status(200).send(viewerContact);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    submitContact,
    getViewersContact,
    deleteViewerContact,
}