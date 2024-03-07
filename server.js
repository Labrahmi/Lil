import app from './app/index.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to local MongoDB
let dbObject = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  db_name: process.env.MONGO_DB_NAME
}
let dbUrl = `mongodb://${dbObject.host}:${dbObject.port}/${dbObject.db_name}`;
console.log(dbUrl);
await mongoose.connect(dbUrl, {});

// Confirm connection to MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'Connected to MongoDB'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
