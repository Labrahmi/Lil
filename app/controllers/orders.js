import { getOrders, postOrder, getMaxTotalPrice, getPopularGenres ,getTotalProfit ,getPopularAuthors } from '../services/orders.js';
import { getBooksBySearch, updateBookQuantity } from '../services/books.js';

export const listOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

function getTotalPrice(orderItems) {
  let totalPrice = 0;
  for (const orderItem of orderItems) {
    totalPrice += orderItem.price * orderItem.amount;
  }
  return totalPrice;
}

export const addOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).send('Invalid request: items array is missing or empty.');
    }
    let orderItems = [];
    for (const item of items) {
      if (!item.bookId || !item.amount || typeof item.amount !== 'number') {
        res.status(400).send('Invalid request: Each item must have bookId and amount.');
      }
      const books = await getBooksBySearch({ _id: item.bookId }, 1, 1);
      if (books.length === 0) {
        res.status(404).send(`Book with id ${item.bookId} not found.`);
      }
      if (books[0].quantity >= item.amount) {
        orderItems.push({
          bookId: item.bookId,
          amount: item.amount,
          price: books[0].price
        });
        updateBookQuantity(item.bookId, item.amount);
      }
    }
    const order = {
      items: orderItems,
      totalPrice: getTotalPrice(orderItems)
    };
    const newOrder = await postOrder(order);
    res.json(newOrder);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

function isValidateDate(date) {
  try {
    new Date(date);
    return true;
  }
  catch (error) {
    return false;
  }
}

export const listMaxTotalPrice = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).send('Invalid request: startDate and endDate are required.');
    }
    if (!isValidateDate(startDate) || !isValidateDate(endDate)) {
      return res.status(400).send('Invalid request: startDate and endDate must be in the format YYYY-MM-DD.');
    }
    const maxOrder = await getMaxTotalPrice(startDate, endDate);
    res.json(maxOrder);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const listPopularGenres = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).send('Invalid request: startDate and endDate are required.');
    }
    if (!isValidateDate(startDate) || !isValidateDate(endDate)) {
      return res.status(400).send('Invalid request: startDate and endDate must be in the format YYYY-MM-DD.');
    }
    const popularGenres = await getPopularGenres(startDate, endDate);
    res.json(popularGenres);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const listTotalProfit = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).send('Invalid request: startDate and endDate are required.');
    }
    if (!isValidateDate(startDate) || !isValidateDate(endDate)) {
      return res.status(400).send('Invalid request: startDate and endDate must be in the format YYYY-MM-DD.');
    }
    const totalProfit = await getTotalProfit(startDate, endDate);
    res.json(totalProfit);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const listPopularAuthors = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const popularAuthors = await getPopularAuthors(startDate, endDate);
    res.json(popularAuthors);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
