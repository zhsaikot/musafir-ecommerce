 import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
// @desc    Create new order (Supports Guest Checkout)
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingCost, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'আপনার কার্ট খালি!' });
    }

    // 1. Check stock and reduce it
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `প্রোডাক্ট পাওয়া যায়নি: ${item.name}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `${product.name} এর স্টক শেষ!` });
      }
      
      product.stock -= item.quantity;
      await product.save();
    }

    // 2. Create the order (user is optional for guest checkout)
    const order = new Order({
      user: req.user ? req.user._id : null, // Null if guest
      orderItems: orderItems.map((item) => ({ ...item, product: item.product })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingCost,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({ 
      ...createdOrder.toObject(), 
      message: 'অর্ডার সফলভাবে সম্পন্ন হয়েছে! আমরা শীঘ্রই আপনাকে কল করব।' 
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'অর্ডার করা যায়নি', error: error.message });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'অর্ডার পাওয়া যায়নি' });
    }

    // Check if the order belongs to the user
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'অনুমতি নেই' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email phone').sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'অর্ডার পাওয়া যায়নি' });
    }

    order.status = req.body.status;

    if (req.body.status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    if (req.body.status === 'cancelled') {
      // Restore stock if cancelled
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    const updatedOrder = await order.save();
    res.json({ ...updatedOrder.toObject(), message: 'অর্ডারের স্ট্যাটাস আপডেট হয়েছে' });
  } catch (error) {
    res.status(500).json({ message: 'স্ট্যাটাস আপডেট করা যায়নি', error: error.message });
  }
};
