const order = require('../model/Order');

exports.createOrder = async (req, res) => {
  const userId = req.params.userId;
  const { productIds, quantity } = req.body;

  try {
    const ord = new order({ user: userId, products: productIds, quantity });
    await ord.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'An error occurred while saving the order' });
  }
};

exports.viweStatus = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    try {
      const ord = await order.findById(orderId);
      if (!ord) {
        return res.status(404).json({ error: 'Order not found' });
      }
      ord.status = status;
      await ord.save();
      res.json({ orderId: ord._id, status: ord.status });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get order status' });
    }
  }

exports.orderHistorty = async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await order.find({ user: userId });
      res.status(200).json({ orders });
      console.log(userId)
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };