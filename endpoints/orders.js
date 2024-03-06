// ./endpoints/orders.js

import express from 'express';
import Order from '../models/order.model.js';

const router = express.Router();

// simple get request
router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

export default router;