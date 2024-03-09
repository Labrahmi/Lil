import Order from '../models/order.js';

export const getOrders = async () => {
  const orders = await Order.find({});
  return orders;
};

export const postOrder = async (order) => {
  const newOrder = new Order(order);
  return await newOrder.save();
}

export const getMaxTotalPrice = async (startDate, endDate) => {
  const max = await Order.findOne({
    date: { $gte: startDate, $lte: endDate } 
  }).sort({ totalPrice: -1 }).limit(1);
  return max;
};

export const getPopularGenres = async (startDate, endDate) => {
  const popularGenres = await Order.aggregate([
    {$match: { date: { $gte: startDate, $lte: endDate } } }, // Filter by date (orders between startDate and endDate)
    {$unwind: "$items"}, // Unwind the items array (create a new document for each item, meanining that 1 order can have multiple items) 
    {$unwind: "$items.genres"}, // Unwind the genres array (create a new document for each genre, meaning that 1 item can have multiple genres)
    {$group: { _id: "$items.genres", count: { $sum: 1 } } }, // Group by genre and count the number of occurrences (orders with that genre)
    {$sort: { count: -1 } }, // Sort by count in descending order (most popular genres first)
    {$limit: 3} // Limit to 3 results 
  ]);
  if (popularGenres === undefined || popularGenres.length == 0) {
    return [];
  }
  const topGenres = popularGenres.map(genre => genre._id);
  return topGenres;
};

export const getTotalProfit = async (startDate, endDate) => {
  const totalProfit = await Order.aggregate([
    { $match: {date: { $gte: startDate, $lte: endDate } } }, // Filter by date (orders between startDate and endDate)
    { $group: {_id: null, totalProfit: { $sum: "$totalPrice" } } } // Group all orders and sum the totalPrice field
  ]);
  if (totalProfit === undefined || totalProfit.length == 0) {
    return 0;
  }
  const profit = totalProfit[0].totalProfit;
  return profit;
};

export const getPopularAuthors = async (startDate, endDate) => {
  const popularAuthors = await Order.aggregate([
    { $match: {date: { $gte: startDate, $lte: endDate } } } , // Filter by date (orders between startDate and endDate)
    { $unwind: "$items"}, // Unwind the items array (create a new document for each item, meanining that 1 order can have multiple items)
    { $group: {_id: "$items.author",totalBooksSold: { $sum: "$items.quantity" } } }, // Group by author and sum the quantity field (total books sold)
    { $sort: { totalBooksSold: -1 } }, // Sort by totalBooksSold in descending order (most popular authors first)
    { $limit: 5 } // Limit to 5 results
  ]);
  if (popularAuthors === undefined || popularAuthors.length == 0) {
    return [];
  }
  const topAuthors = popularAuthors.map(author => author._id); // Extract the author names from the result
  return topAuthors;
};

