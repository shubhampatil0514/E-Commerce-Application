const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const { ac } = require('../middleware/auth');

router.post('/:productId/:userName',  reviewController.createReview);

router.get('/:productId', reviewController.getReview);


router.delete('/reviews/:reviewId',reviewController.deleteReview);

module.exports = router;
