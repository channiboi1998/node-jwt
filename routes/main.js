const express = require('express');
const router = express.Router();
const { login, dashboard } = require('../controllers/main');
const { authMiddleware } = require('../middleware/auth');

router.route('/login').post(login);
//Allow only authenticated users to access `/dashboard` route, inserting `authMiddleware` middelware.
router.route('/dashboard').get(authMiddleware, dashboard);

module.exports = router; 