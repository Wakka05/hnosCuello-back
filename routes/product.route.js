const express = require('express');
const router = express.Router();

// Controller
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/:id', product_controller.details);
router.post('/create', product_controller.create);
router.put('/:id', product_controller.update);
router.delete('/:id', product_controller.delete);
module.exports = router;