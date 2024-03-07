import { getOrders, postOrder, getMaxTotalPrice, getPopularGenres ,getTotalProfit ,getPopularAuthors } from '../services/orders.js';
import { getBooksBySearch } from '../services/books.js';

// listOrders ✅
// addOrder ✅
// listMaxTotalPrice ✅
// listPopularGenres ✅
// listTotalProfit ✅
// listPopularAuthors ✅

// - Returning all orders (using pagination)
// endpoint: GET /orders
export const listOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// - Adding a new order
// endpoint: POST /orders/add
export const addOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    if (!items || !totalPrice) {
      res.status(400).send('Invalid request');
    }
    const bookIds = items.map(i => i.bookId);
    const books = await getBooksBySearch({ _id: { $in: bookIds } });
    if (books.length !== items.length) {
      res.status(400).send('Invalid request');
    }
    const order = await postOrder({ items, totalPrice });
    res.json(order);    
  } catch (error) {
    res.status(404).send(error.message);
  }
};


// - Finding the order with maximum totalPrice in a date range
// endpoint: GET /orders/maxTotalPrice?startDate=...&endDate=...
export const listMaxTotalPrice = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const maxOrder = await getMaxTotalPrice(startDate, endDate);
    res.json(maxOrder);
  } catch (error) {
    res.status(404).send(error.message);
  }
};



// - Finding the 3 most popular genres in a date range
// endpoint: GET /orders/genres/popular?startDate=...&endDate=...
export const listPopularGenres = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const popularGenres = await getPopularGenres(startDate, endDate);
    res.json(popularGenres);
  } catch (error) {
    res.status(404).send(error.message);
  }
};



// - Finding the total profit in a date range
// endpoint: GET /orders/profit?startDate=...&endDate=...
export const listTotalProfit = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const totalProfit = await getTotalProfit(startDate, endDate);
    res.json(totalProfit);
  } catch (error) {
    res.status(404).send(error.message);
  }
};


// - Finding the 5 most bought authors in a date range
// endpoint: GET /orders/authors/popular?startDate=...&endDate=...
export const listPopularAuthors = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const popularAuthors = await getPopularAuthors(startDate, endDate);
    res.json(popularAuthors);
  } catch (error) {
    res.status(404).send(error.message);
  }
};


