const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/user');
const { userSignupValidator, userSignupValidation } = require('../validator/index');
router.post('/signup', userSignupValidator, userSignupValidation, signup);

module.exports = router;
