import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  name: { type: String, default: "unknown" },
  country: { type: String, default: "unknown" },
});

//  Model Name                Schema      Collection Name
//      |                        |             |
const Author = mongoose.model('Author', AuthorSchema);

export default Author;