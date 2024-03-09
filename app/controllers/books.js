import { getAllBooks, postBook, deleteBook, getBooksBySearch, getBooksByGenre, getBooksByYear, getBooksByAuthorCountry } from '../services/books.js'

export const listBooks = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    if (page < 1 || pageSize < 1) {
      return res.status(400).send("Invalid page or pageSize");
    }
    const books = await getAllBooks(page, pageSize);
    res.json(books);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const addBooks = async (req, res) => {
  try {
    let booksList = req.body.booksList;
    if (!booksList) {
      return res.status(400).send("No books provided");
    }
    let addedBooks = await postBook(booksList);
    res.status(201).json(addedBooks);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await deleteBook(bookId);
    res.json(deletedBook);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const listSearchedBooks = async (req, res) => {
  try {
    const { title, publishingYear, genres, authors, page = 1, pageSize = 10 } = req.query;
    if (page < 1 || pageSize < 1) {
      return res.status(400).send("Invalid page or pageSize");
    }
    if (!title && !publishingYear && !genres && !authors) {
      return res.status(400).json({ message: "No search parameters provided" });
    }
    const searchParams = { title, publishingYear, genres, authors };
    const books = await getBooksBySearch(searchParams, page, pageSize);
    res.json(books);    
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const listBooksByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const { page = 1, pageSize = 10 } = req.query;
    if (page < 1 || pageSize < 1) {
      return res.status(400).send("Invalid page or pageSize");
    }
    const books = await getBooksByGenre(genre, page, pageSize);
    res.json(books);
  } catch (error) {
    res.status(404).send(error.message);
  }
};


function isValidYear(year) {
  return (!isNaN(year) && year >= 0);
};

export const listBooksByYear = async (req, res) => {
  try {
    const { start, end, page = 1, pageSize = 10 } = req.query;
    if (page < 1 || pageSize < 1) {
      return res.status(400).send("Invalid page or pageSize");
    }
    if (!isValidYear(start) || !isValidYear(end)) {
      return res.status(400).send("No search parameters provided");
    }
    const books = await getBooksByYear(start, end, page, pageSize);
    res.json(books);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const listBooksByAuthorCountry = async (req, res) => {
  try {
    const country = req.params.country;
    const { page = 1, pageSize = 10 } = req.query;
    if (page < 1 || pageSize < 1) {
      return res.status(400).send("Invalid page or pageSize");
    }
    const books = await getBooksByAuthorCountry(country, page, pageSize);
    res.json(books);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
