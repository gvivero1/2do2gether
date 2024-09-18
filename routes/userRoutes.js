const express = require('express');
const { signupController, loginController, viewProfileController, editProfileController } = require('../controllers/userControllers');

const router = express.Router();

// Signup route
router.post('/signup', signupController);

// Login route
router.post('/login', loginController);

// View profile route
router.get('/profile', viewProfileController);

// Edit profile route
router.put('/profile', editProfileController);
