import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  name: { type: String, default: "Unknown" },
  country: { type: String, default: "Unknown" },
});

//  Model Name                          Schema      Collection Name
//      |                                  |             |
const Author = mongoose.model('Author', AuthorSchema, 'authors');

export default Author;