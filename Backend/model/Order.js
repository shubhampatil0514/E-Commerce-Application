const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: String, ref: 'User' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  quantity: [ { type: Number }],
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
