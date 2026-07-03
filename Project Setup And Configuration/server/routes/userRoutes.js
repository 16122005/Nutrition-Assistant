const express = require('express');
const router = express.Router();
const { userLogin, userRegister } = require('../controllers/userController');

// Define routes - these MUST match the paths in your React axios calls
router.post('/register', userRegister);
router.post('/login', userLogin);

module.exports = router;