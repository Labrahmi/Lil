// Import express and necessary modules
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

// Import routes
import authorsRouter from './routes/authors.js';
import booksRouter from './routes/books.js';
import ordersRouter from './routes/orders.js';

// Create an Express app and setup necessary middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Use routes for the API endpoints
app.use('/api/authors', authorsRouter);
app.use('/api/books', booksRouter);
app.use('/api/orders', ordersRouter);

export default app;
