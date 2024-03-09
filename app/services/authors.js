import Author from '../models/author.js';
import Book from '../models/book.js';

export const getAllAuthors = async () => {
  const authors = await Author.find();
  return authors;
};

export const postAuthor = async (author) => {
  const newAuthor = new Author(author);
  return await newAuthor.save();
};

export const putAuthor = async (author) => {
  const updatedAuthor = await Author.findByIdAndUpdate(author.id, author, { new: true });
  return updatedAuthor;
};

export const getBooksByAuthor = async (authorId, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const books = await Book.find({
    authors: { $in: [authorId] }
  }).skip(skip).limit(pageSize);
  return books;
};
