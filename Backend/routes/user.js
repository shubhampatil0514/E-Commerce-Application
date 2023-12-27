const express = require('express');
const userController= require('../controllers/userController')
const router = express.Router();
const multer = require('multer');
const { signupValidation } = require('../validators/userValidator');
const { grantAccess } = require('../middleware/auth');
const passport = require('passport');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
const upload = multer({ storage }); 


router.post('/signup',upload.single('profilePicture'),signupValidation, userController.signup);
router.get('/:userId',userController.profile);
router.post('/login', userController.login);
router.put('/:id',userController.updateUser);
router.post( '/password-reset-request',userController.requestPasswordReset);
router.post('/password-reset',userController.resetPassword);
/*
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful Google authentication
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/cart');
  }
);*/

 module.exports = router;

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - profilePicture
 *               - username
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User account created successfully
 *       '400':
 *         description: Bad request, check your request data
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate and log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Login successful
 *       '400':
 *         description: Bad request, check your request data
 *       '401':
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user information by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User information updated successfully
 *       '400':
 *         description: Bad request, check your request data
 *       '404':
 *         description: User not found
 */
