const express = require('express');
const { 
    getViewersContact,
    deleteViewerContact,
} = require('../controller/viewerContact.controller');

const router = express.Router();

router.get('/', getViewersContact);
router.delete('/:id', deleteViewerContact);

module.exports = router;