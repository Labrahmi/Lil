import mongoose from 'mongoose';

const { Types } = mongoose;

const BookSchema = new mongoose.Schema({
  title: String,
  publishingYear: Number,
  genres: [String],
  authors: [Types.ObjectId],
  quantity: Number,
  price: Number,
});

//  Model Name                      Schema      Collection Name
//      |                              |            |
const Book = mongoose.model('Book', BookSchema, 'books');

export default Book;