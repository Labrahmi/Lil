import express from 'express';
import * as controller from '../controllers/books.js';
import cacheNoStore from '../middlewares/cacheNoStore.js';

const router = express.Router();

router.get('/', cacheNoStore, controller.listBooks);
router.post('/add', cacheNoStore, controller.addBooks);
router.delete('/:id/delete', cacheNoStore, controller.deleteBookById);
router.get('/search', cacheNoStore, controller.listSearchedBooks);
router.get('/genre/:genre', cacheNoStore, controller.listBooksByGenre);
router.get('/publishingYear', cacheNoStore, controller.listBooksByYear);
router.get('/author/country', cacheNoStore, controller.listBooksByAuthorCountry);

export default router;