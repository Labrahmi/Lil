import express from 'express';
import * as controller from '../controllers/authors.js';
import cacheNoStore from '../middlewares/cacheNoStore.js';

const router = express.Router();

router.get('/', cacheNoStore, controller.listAuthors);
router.post('/add', cacheNoStore,  controller.addAuthor);
router.put('/update', cacheNoStore, controller.updateAuthor);
router.get('/:id/books', cacheNoStore, controller.listAllBooks);

export default router;