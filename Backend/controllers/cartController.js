const Cart = require('../model/Cart');

exports.addToCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { productId, productName, productPrice, quantity, productimg } = req.body; 
      let cart = await Cart.findOne({ userId: userId });
      if (!cart) {
        cart = new Cart({ userId: userId, items: [] });
      }
      const existingItem = cart.items.find((item) => item && item.productId && item.productId.equals(productId));
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, productName, productPrice, quantity,productimg });
      }
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.getCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ userId: userId});
      console.log(cart)
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.updateCart = async (req, res) => {
    try {
      const userId = req.params.userId; 
      const updatedCart = req.body.items; 
      await Cart.findOneAndUpdate({ userId: userId }, { items: updatedCart });
  
      res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


exports.removeCartItem = async (req, res) => {
    try {
      const userId = req.params.userId;
      const itemId = req.params.itemId; 
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      const itemIndexToRemove = cart.items.findIndex((item) => item._id == itemId);
      if (itemIndexToRemove === -1) {
        return res.status(404).json({ message: 'Item not found in the cart' });
      }
      cart.items.splice(itemIndexToRemove, 1);
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };