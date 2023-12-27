const express = require('express');
const productController= require('../controllers/productController')
const router = express.Router();
const multer = require('multer');
const  adminAuth = require('../middleware/auth'); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/create',  adminAuth ,upload.single('img'),productController.createProduct);
router.put('/:id',productController.updateProduct);
router.get('/:id',productController.getProductById);
router.get('/', productController.getAllProducts);

 module.exports = router;

 /**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stockQuantity:
 *                 type: integer
 *               categories:
 *                 type: string
 *             required:
 *               - image
 *               - name
 *               - description
 *               - price
 *               - stockQuantity
 *               - categories
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Bad request, check your request data
 */

 /**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stockQuantity:
 *                 type: integer
 *               categories:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stockQuantity
 *               - categories
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '400':
 *         description: Bad request, check your request data
 *       '404':
 *         description: Product not found
 */

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Product not found
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get a list of all products
 *     responses:
 *       '200':
 *         description: Successful response
 */
