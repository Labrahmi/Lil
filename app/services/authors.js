import Author from '../models/author.js';
import Book from '../models/book.js';

// ---------------------------------

export const getAllAuthors = async () => {
  const authors = await Author.find({});
  return authors.map(a => ({
    id: a._id,
    name: a.name,
    country: a.country
  }));
};

// ---------------------------------

export const postAuthor = async (author) => {
  const newAuthor = new Author(author);
  return await newAuthor.save();
};

// ---------------------------------

export const putAuthor = async (author) => {
  const updatedAuthor = await Author.findByIdAndUpdate(author.id, author, { new: true });
  return {
    id: updatedAuthor._id,
    name: updatedAuthor.name,
    country: updatedAuthor.country
  };
};

// ---------------------------------

export const getBooksByAuthor = async (authorId, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  // authors: authorId
  const books = await Book.find({
    authors: { $in: [authorId] }
  }).skip(skip).limit(pageSize);
  return books.map(b => ({
    id: b._id,
    title: b.title,
    publishingYear: b.publishingYear,
    genres: b.genres,
    authors: b.authors,
    quantity: b.quantity,
    price: b.price
  }));
};

// ---------------------------------


