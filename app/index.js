
// Import express and necessary modules
import bodyParser from 'body-parser';
import express from 'express';

// Import routes
import authorsRouter from './routes/authors.js';
import booksRouter from './routes/books.js';
import ordersRouter from './routes/orders.js';

// Create an Express app and setup necessary middlewares
const app = express();
app.use(bodyParser.json());

// Use routes for the API endpoints
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/orders', ordersRouter);

export default app;




















// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// // Import routes
// import authorRoutes from './endpoints/authors.js';
// import bookRoutes from './endpoints/books.js';
// import orderRoutes from './endpoints/orders.js';

// // Load environment variables
// dotenv.config();

// // Create an Express app
// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Connect to local MongoDB
// let dbObject = {
//   host: process.env.MONGO_HOST,
//   port: process.env.MONGO_PORT,
//   db_name: process.env.MONGO_DB_NAME
// }

// let mongo_url = `mongodb://${dbObject.host}:${dbObject.port}/${dbObject.db_name}`;
// await mongoose.connect(mongo_url, {});

// // Confirm connection to MongoDB
// const db = mongoose.connection;
// db.on('connected', console.log.bind(console, 'Connected to MongoDB'));
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // API info
// let api_info = {
//   version: process.env.API_VERSION,
// }
// // Use routes
// app.use(`/${api_info.version}/authors`, authorRoutes);
// app.use(`/${api_info.version}/books`, bookRoutes);
// app.use(`/${api_info.version}/orders`, orderRoutes);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// // Default route
// export default app;