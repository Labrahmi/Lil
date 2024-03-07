import Author from '../models/author.js';
import Book from '../models/book.js';

// ---------------------------------

export const getAllBooks = async (page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const books = await Book.find({}).skip(skip).limit(pageSize);
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

export const postBook = async (booksList) => {
  var addedBooks = [];
  for (const book of booksList) {
    const authorsIds = book.authors;
    for (const authorId of authorsIds) {
      if (await Author.findById(authorId)) {
        let new_book = new Book(book);
        await new_book.save();
        addedBooks.push(new_book);
      }
    }
  }
  return addedBooks;
};


// ---------------------------------

export const deleteBook = async (bookId) => {
  const deletedBook = await Book.findOneAndDelete({ _id: bookId });
  return deletedBook.map(b => ({
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

export const getBooksBySearch = async (query, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const books = await Book.find(query).skip(skip).limit(pageSize);
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

export const getBooksByGenre = async (genre, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const books = await Book.find({ genres: { $in: genre } }).skip(skip).limit(pageSize);
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

export const getBooksByYear = async (start, end, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const books = await Book.find({ publishingYear: { $gte: start, $lte: end } }).skip(skip).limit(pageSize);
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

export const getBooksByAuthorCountry = async (country, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const authors = await Author.find({ country: country });
  const authorsIds = authors.map(a => a._id);
  const books = await Book.find({ authors: { $in: authorsIds } }).skip(skip).limit(pageSize);
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



