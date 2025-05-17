const express = require('express');
const router = express.Router();

//controller
const { login} = require('../controller/authController');

router.post('/login', login);

module.exports = router;
