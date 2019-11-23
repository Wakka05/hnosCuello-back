const express = require('express');
const router = express.Router();

// Controller
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', user_controller.getAll);
router.get('/:id', user_controller.details);
router.post('/create', user_controller.create);
router.put('/:id', user_controller.update);
router.delete('/:id', user_controller.delete);
module.exports = router;