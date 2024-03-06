// ./endpoints/books.js

import express from 'express';
import Book from '../models/book.model.js';
import Author from '../models/author.model.js';

const router = express.Router();

// GET /books | Get all books
// (example: /books)
router.get('/', async (req, res) => {
  var response = {}, status;
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const skip = (page - 1) * pageSize;
    const books = await Book.find().skip(skip).limit(pageSize);
    status = 200;
    response = books;
  } catch (error) {
    status = 404;
    response = {
      message: "No books found",
    }
  }
  res.json(response).status(status);
});

// POST /books/add | Add one or many new books in one request (books in the body of the request)
// (example: /books/add)
router.post('/add', async (req, res) => {
  let response = {}, status;
  try {
    let body_books = req.body.books;
    if (!body_books) {
      return res.status(400).json({ message: "No books provided" });
    }
    body_books.forEach(async (book) => {
      let authorsIds = book.authors;
      authorsIds.forEach(async (authorId) => {
        if (await Author.findById(authorId)) {
          let new_book = new Book(book);
          await new_book.save();
        }
      });
    });
    status = 201;
    response = {
      message: "Books added successfully",
    }
  } catch (error) {
    status = 400;
    response = {
      message: "Books not added",
    };
  }
  res.json(response).status(status);
});


// Delete /books/delete | Delete a book
// (example: /books/delete?id=1024)
router.delete('/delete', async (req, res) => {
  var response = {}, status;
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "No book id provided" });
    }
    let book = await Book.findOneAndDelete(id);
    status = 200;
    response = {
      message: "Book deleted successfully",
      book: book
    }
  } catch (error) {
    status = 400;
    response = {
      message: "Book not deleted",
    };
  }
  res.json(response).status(status);
});

// - Returning books according to values that appear under the name *
// GET /books/search | Search for books
// (example: /books/search?title=book1&publishingYear=2020&genres=genre1,genre2&authors=author1,author2)
router.get('/search', async (req, res) => {
  var response = {}, status;
  try {
    const { title, publishingYear, genres, authors, page = 1, pageSize = 10 } = req.query;
    if (!title && !publishingYear && !genres && !authors) {
      return res.status(400).json({ message: "No search parameters provided" });
    }
    const query = {};
    if (title) query.title = title;
    if (publishingYear) query.publishingYear = publishingYear;
    if (genres) query.genres = { $in: genres.split(',') };
    if (authors) query.authors = { $in: authors.split(',') };
    const skip = (page - 1) * pageSize;
    const books = await Book.find(query).skip(skip).limit(pageSize);
    status = 200;
    response = books;
  } catch (error) {
    status = 404;
    response = {
      message: "No books found",
    }
  }
  res.json(response).status(status);
});



// Returning books by genre *
// GET /books/genre | Get all books by genre
// (example: /books/genre?genre=genre1)
router.get('/genre', async (req, res) => {
  var response = {}, status;
  try {
    const { genre, page = 1, pageSize = 10 } = req.query;
    if (!genre) {
      return res.status(400).json({ message: "No genre provided" });
    }
    const skip = (page - 1) * pageSize;
    const books = await Book.find({ genres: { $in: genre } }).skip(skip).limit(pageSize);
    status = 200;
    response = books;
  } catch (error) {
    status = 404;
    response = {
      message: "No books found",
    }
  }
  res.json(response).status(status);
});


// - Returning books by publishingYear in the range *
// GET /books/publishingYear | Get all books by publishingYear in the range
// (example: /books/publishingYear?start=2000&end=2020)
router.get('/publishingYear', async (req, res) => {
  var response = {}, status;
  try {
    const { start, end, page = 1, pageSize = 10 } = req.query;
    if (!start || !end || isNaN(start) || isNaN(end)) {
        return res.status(400).json({ message: "Invalid or missing query parameters." });
    }
    const skip = (page - 1) * pageSize;
    const books = await Book.find({ publishingYear: { $gte: start, $lte: end } }).skip(skip).limit(pageSize);
    status = 200;
    response = books;
  } catch (error) {
    status = 404;
    response = {
      message: "No books found",
    }
  }
  res.json(response).status(status);
})



// - Returning books according to the country of the author *
// GET /books/country | Get all books by country of the author
// (example: /books/authors?country=country1)
router.get('/authors', async (req, res) => {
  var response = {}, status;
  try {
    const { country, page = 1, pageSize = 10 } = req.query;
    if (!country) {
      return res.status(400).json({ message: "Invalid or missing query parameters." });
    }
    const authors = await Author.find({ country: country });
    const skip = (page - 1) * pageSize;
    const authorsIds = authors.slice(skip, skip + parseInt(pageSize)).map(author => author._id);
    const books = await Book.find({ authors: { $in: authorsIds } })
                             .skip(skip)
                             .limit(parseInt(pageSize));
    status = 200;
    response = books;
  } catch (error) {
    status = 404;
    response = {
      message: "No books found",
    }
  }
  res.json(response).status(status);
});


export default router;