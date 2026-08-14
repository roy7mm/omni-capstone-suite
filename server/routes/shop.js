import express from 'express';
import { mockProducts } from '../data/mockDb.js';

const router = express.Router();
let userOrders = [];

// GET product catalog with category and search filter
router.get('/products', (req, res) => {
  const { category, search, maxPrice } = req.query;
  let products = [...mockProducts];

  if (category && category !== 'All') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (maxPrice) {
    products = products.filter(p => p.price <= parseFloat(maxPrice));
  }

  res.json({ success: true, count: products.length, products });
});

// GET single product by ID
router.get('/products/:id', (req, res) => {
  const product = mockProducts.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

// POST create express order
router.post('/orders', (req, res) => {
  const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
  }

  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const newOrder = {
    orderId,
    items,
    totalAmount,
    shippingAddress: shippingAddress || { name: "Alex Mercer", city: "San Francisco", zip: "94105" },
    paymentMethod: paymentMethod || "Credit Card (Encrypted)",
    status: "Processing",
    estimatedDelivery: "2-3 Business Days",
    createdAt: new Date().toISOString()
  };

  userOrders.unshift(newOrder);
  res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
});

// GET user order history
router.get('/orders', (req, res) => {
  res.json({ success: true, count: userOrders.length, orders: userOrders });
});

export default router;
