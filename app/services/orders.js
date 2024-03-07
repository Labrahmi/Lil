import Order from '../models/order.js';

// ---------------------------------

export const getOrders = async () => {
  const orders = await Order.find({});
  return orders.map(o => ({
    id: o._id,
    items: o.items,
    totalPrice: o.totalPrice,
    date: o.date
  }));
};

// ---------------------------------

export const postOrder = async (order) => {
  const new_order = new Order(order);
  await new_order.save();
  return {
    id: new_order._id,
    items: new_order.items,
    totalPrice: new_order.totalPrice,
    date: new_order.date
  }; 
}

// ---------------------------------

export const getMaxTotalPrice = async (startDate, endDate) => {
  const max = await Order.findOne({
    date: { $gte: startDate, $lte: endDate } 
  }).sort({ totalPrice: -1 });
  if (!max) {
    return null;
  }
  return {
    id: max._id,
    items: max.items,
    totalPrice: max.totalPrice,
    date: max.date
  }
};

// ---------------------------------

export const getPopularGenres = async (startDate, endDate) => {
  const orders = await Order.find({
    date: { $gte: startDate, $lte: endDate }
  });
  const genres = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      item.genres.forEach(genre => {
        if (acc[genre]) {
          acc[genre] += 1;
        } else {
          acc[genre] = 1;
        }
      });
    });
    return acc;
  }, {});
  const sortedGenres = Object.keys(genres).sort((a, b) => genres[b] - genres[a]);
  return sortedGenres.slice(0, 3);
};

// ---------------------------------

export const getTotalProfit = async (startDate, endDate) => {
  const orders = await Order.find({
    date: { $gte: startDate, $lte: endDate }
  });
  const profit = orders.reduce((acc, order) => {
    return acc + order.totalPrice;
  }, 0);
  return profit;
};

// ---------------------------------

export const getPopularAuthors = async (startDate, endDate) => {
  const orders = await Order.find({
    date: { $gte: startDate, $lte: endDate }
  });
  const authors = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      if (acc[item.author]) {
        acc[item.author] += 1;
      } else {
        acc[item.author] = 1;
      }
    });
    return acc;
  }, {});
  const sortedAuthors = Object.keys(authors).sort((a, b) => authors[b] - authors[a]);
  return sortedAuthors.slice(0, 5);
}

// ---------------------------------
