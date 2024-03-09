import Author from '../models/author.js';
import Book from '../models/book.js';

export const getAllBooks = async (page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const books = await Book.find({}).skip(skip).limit(pageSize);
  return books;
};

export const postBook = async (booksList) => {
  let addedBooks = [];
  for (const book of booksList) {
    const authorsIds = book.authors;
    for (const authorId of authorsIds) {
      if (await Author.findById(authorId)) {
        let newBook = new Book(book);
        addedBooks.push(await newBook.save());
      }
    }
  }
  return addedBooks;
};

export const deleteBook = async (bookId) => {
  const deletedBook = await Book.findOneAndDelete({ _id: bookId });
  if (!deletedBook) {
    throw new Error('Book not found');
  }
  return deletedBook;
};

export const getBooksBySearch = async (searchParams, page, pageSize) => {
  const query = {};
  if (searchParams.title) query.title = searchParams.title;
  if (searchParams.publishingYear) query.publishingYear = searchParams.publishingYear;
  if (searchParams.genres) query.genres = { $in: searchParams.genres };
  if (searchParams.authors) query.authors = { $in: searchParams.authors };
  const skip = (page - 1) * pageSize;
  const books = await Book.find(query).skip(skip).limit(pageSize);
  return books;
};

export const getBooksByGenre = async (genre, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const books = await Book.find({ genres: { $in: genre } }).skip(skip).limit(pageSize);
  return books;
};

export const getBooksByYear = async (start, end, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const books = await Book.find({
    publishingYear: { $gte: start, $lte: end }
  }).skip(skip).limit(pageSize);
  return books;
};

export const getBooksByAuthorCountry = async (country, page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const authors = await Author.find({ country: country });
  if (!authors || authors.length === 0) {
    return [];
  }
  const authorsIds = authors.map(a => a._id);
  const books = await Book.find({ authors: { $in: authorsIds } }).skip(skip).limit(pageSize);
  return books;
};

export const updateBookQuantity = async (bookId, amount) => {
  Book.findByIdAndUpdate(bookId, { $inc: { quantity: -amount } }, { new: true });
}
