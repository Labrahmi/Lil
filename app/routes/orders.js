import express from 'express';
import * as controller from '../controllers/orders.js';
import cacheNoStore from '../middlewares/cacheNoStore.js';

const router = express.Router();

router.get('/', cacheNoStore, controller.listOrders);
router.post('/add', cacheNoStore, controller.addOrder);
router.get('/maxTotalPrice', cacheNoStore, controller.listMaxTotalPrice);
router.get('/genres/popular', cacheNoStore, controller.listPopularGenres);
router.get('/profit', cacheNoStore, controller.listTotalProfit);
router.get('/authors/popular', cacheNoStore, controller.listPopularAuthors);

export default router;