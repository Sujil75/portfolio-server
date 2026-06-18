const { 
    createContact, 
    getContact,
    deleteContact,
} = require('../service/viewerContact.services');

const submitContact = async (req, res) => {
    try {
        // console.log("CONTENT-TYPE:", req.headers["content-type"]);
        // console.log("BODY:", req.body);
        const data = req.body;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                message: "Request body missing"
            });
        };

        // console.log(data);
        
        await createContact(data);

        return res.status(200).json({
            message: "Mail Send Successfully"
        });
    } catch(err) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: "Contact already exists (duplicate entry)"
            })
        }

        return res.status(err.status || 500).json({
            message: err.message,
        })
    }
};

const getViewersContact = async (req, res) => {
    try {
        const viewerContact = await getContact();

        return res.status(200).send(viewerContact);
    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status,
            message: err.message,
        });
    };
}

const deleteViewerContact = async (req, res) => {
    try {
        const viewerContact = await deleteContact(req.params.id);

        return res.status(200).send(viewerContact);
    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status,
            message: err.message,
        })
    }
}

module.exports = {
    submitContact,
    getViewersContact,
    deleteViewerContact,
}