const express = require('express');
const router = express.Router();

// Controller
const resource_controller = require('../controllers/resource.controller');


// a simple test url to check that all of our files are communicating correctly.
router.post('/upload', resource_controller.uploadResource);
router.get('/:id', resource_controller.getResources);
module.exports = router;