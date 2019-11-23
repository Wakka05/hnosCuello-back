const express = require('express');
const router = express.Router();

// Controller
const category_controller = require('../controllers/category.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', category_controller.get);
router.get('/:id', category_controller.details);
router.post('/create', category_controller.create);
router.put('/:id', category_controller.update);
router.delete('/:id', category_controller.delete);
module.exports = router;