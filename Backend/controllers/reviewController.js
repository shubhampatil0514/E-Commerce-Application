const Review = require('../model/Review ')
const product= require('../model/Product')
const user= require('../model/User')

exports.createReview = async (req, res) => {
    try {
      const { productId,userName } = req.params;
      const { rating, comment } = req.body;

      const review = new Review({
        productID: productId,
        user: userName,
        rating,
        comment,
      });
  
      await review.save();
      res.status(201).json({ message: 'Review created successfully', review });
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Failed to create review' });
    }
  };
    
exports.getReview= async (req, res) =>{
  const productID = req.params.id;

  try {
    const pro = await Review.find(productID);
    if (!pro) {
      return res.status(404).json({ error: 'Product not found' });
    }

      const reviews = await Review.find({ product: productID });
      res.json({ reviews });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  }

exports.deleteReview = async (req, res) =>{
    try {
      const { reviewId } = req.params;
  
      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      // Check if the user is the owner of the review or an admin
      if (req.user.id !== review.user && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
      }
  
      await review.remove();
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ error: 'Failed to delete review' });
    }
  }
  
