const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { grantAccess } = require('../middleware/auth');


router.post('/create',adminController.createAdmin);
router.post('/login', adminController.loginAdmin);
router.put('/:adminId',  adminController.updateAdmin);
router.delete('/:adminId',adminController.deleteAdmin);

module.exports = router;

/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary: Create a new admin user
 *     tags:
 *       - Admin
 *     requestBody:
 *       description: Admin user information
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
 *       200:
 *         description: Admin created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Log in as an admin user
 *     tags:
 *       - Admin
 *     requestBody:
 *       description: Admin login credentials
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
 *       200:
 *         description: Admin logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *                 expiresIn:
 *                   type: string
 *         example:
 *           username: adminuser
 *           role: admin
 *           email: admin@example.com
 *           token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *           expiresIn: 10d
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/update/{adminId}:
 *   put:
 *     summary: Update an admin user
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: adminId
 *         description: ID of the admin user to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Admin user data to update
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
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   type: object
 *             example:
 *               message: Admin updated successfully
 *               admin:
 *                 _id: 5fbaa2b50e48e3675b93136a
 *                 username: newadminuser
 *                 email: newadmin@example.com
 *       400:
 *         description: Bad request
 *       404:
 *         description: Admin user not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/delete/{adminId}:
 *   delete:
 *     summary: Delete an admin user
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: adminId
 *         description: ID of the admin user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Admin deleted successfully
 *       404:
 *         description: Admin user not found
 *       500:
 *         description: Internal server error
 */
