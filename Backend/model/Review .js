const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    productID: {
      type: String,
      ref: 'Product',
     
    },
    user: {
      type: String,
      ref: 'User', 
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
