const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add/:userId', cartController.addToCart);
router.get('/:userId', cartController.getCart);
router.post('/update/:userId', cartController.updateCart);
router.delete('/remove/:itemId', cartController.removeCartItem);

module.exports = router;
