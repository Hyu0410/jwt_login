const express = require('express');
const router = express.Router();

//controller
const { login, profile } = require('../controller/authController');
const { authenticateAccessToken } = require('../middlewares');

router.post('/login', login);
router.get('/profile', authenticateAccessToken, profile);

module.exports = router;
