// endpoint: /authors

import express from 'express';
import Author from '../models/author.model.js';
import Book from '../models/book.model.js';

const router = express.Router();

// GET /authors | Get all authors
// (example: /authors)
router.get('/', async (req, res) => {
  var response = {}, status;
  try {
    const authors = await Author.find();
    status = 200;
    response = {
      message: "Authors retrieved successfully",
      authors: authors
    }
  } catch (error) {
    status = 404;
    response = {
      message: "No authors found",
    }
  }
  res.json(response).status(status);
});

// POST /authors/add | Add a new author 
// (example: /authors/add?name=doex&country=USA)
router.post('/add', async (req, res) => {
  let response = {}, status;
  try {
    const { name, country } = req.query;
    const author = new Author({ name, country });
    await author.save();
    status = 201;
    response = {
      message: "Author added successfully",
      author: author
    }; 
  } catch (error) {
    status = 400;
    response = {
      message: "Author not added",
    };
  }
  res.json(response).status(status);
});

// PUT /authors/update | Update an author 
// (example: /authors/update?id=1024&name=joex&country=UK)
router.put('/update', async (req, res) => {
  const { id, name, country } = req.query;
  var response = {}, status;
  try {
    const author = await Author.findById(id);
    author.name = name;
    author.country = country;
    await author.save();
    status = 200;
    response = {
      message: "Author updated successfully",
      author: author
    }; 
  } catch (error) {
    status = 404;
    response = {
      message: "Author not found",
    };
  }
  res.json(response).status(status);
});


// GET /authors/:id/books | Returning all books by author *
// (example: /authors/1024/books)
router.get('/:id/books', async (req, res) => {
  const { id } = req.params;
  var response = {}, status;
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const skip = (page - 1) * pageSize;
    const books = await Book.find({ authors: id }).skip(skip).limit(pageSize);
    status = 200;
    response = {
      message: "Books retrieved successfully",
      books: books
    }
  } catch (error) {
    status = 404;
    response = {
      message: "No books found",
    }
  }
  res.json(response).status(status);
});







export default router;