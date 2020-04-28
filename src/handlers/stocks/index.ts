import { Router } from 'express';
import { getLastStockEntry, getLatestStockEntries, listStocks } from './get';
import { addStocks } from './create';

const router = Router();
router.get('/latest', getLatestStockEntries);
router.get('/last', getLastStockEntry);
router.get('/', listStocks);
router.post('/', addStocks);

export default router;
