const express = require('express');
const router = express.Router();

// Controller
const order_controller = require('../controllers/order.controller');


// a simple test url to check that all of our files are communicating correctly.
//router.get('/', category_controller.getAll);
router.get('/:id', order_controller.details);
router.post('/create', order_controller.create);
router.put('/:id', order_controller.update);
router.delete('/:id', order_controller.delete);
module.exports = router;