import { getAllAuthors, postAuthor, putAuthor, getBooksByAuthor } from '../services/authors.js';

export const listAuthors = async (req, res) => {
  try {
    const authors = await getAllAuthors();
    res.json(authors);
  }
  catch (err) {
    res.status(404).send(err.message);
  }
};

export const addAuthor = async (req, res) => {
  try {
    const { name, country } = req.query;
    const author = { name, country };
    const newAuthor = await postAuthor(author);
    res.status(201).json(newAuthor);
  }
  catch (err) {
    res.status(404).send(err.message);
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { id, name, country } = req.query;
    if (!id) {
      res.status(400).send('Author ID is required');
    }
    const author = { id, name, country };
    const updatedAuthor = await putAuthor(author);
    res.json(updatedAuthor);
  }
  catch (err) {
    res.status(404).send(err.message);
  }
};

export const listAllBooks = async (req, res) => {
  try {
    const authorId = req.params.id;
    const { page = 1, pageSize = 10 } = req.query;
    if (page < 1 || pageSize < 1) {
      res.status(400).send('Invalid page or pageSize');
    }
    const books = await getBooksByAuthor(authorId, page, pageSize);
    res.json(books);
  } catch (err) {
    res.status(404).send(err.message);
  }
};
