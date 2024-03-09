import app from './app/index.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to local MongoDB
await mongoose.connect(process.env.MONGO_URI, {});

// Confirm connection to MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'Connected to MongoDB'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
