const express = require('express');
const router = express.Router();

//controller
const { login, profile, refresh } = require('../controller/authController');
const { authenticateAccessToken } = require('../middlewares/auth');

router.post('/login', login);
router.get('/profile', authenticateAccessToken, profile);
router.post('/refresh', refresh);

module.exports = router;
