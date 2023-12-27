const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  
  },
  productName: {
    type: String,
   
  },
  productPrice: {
    type: Number,
   
  },
  quantity: {
    type: Number,
    default: 1,
   
  },
  productimg: { type: String, },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
     
    },
  items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);


