import { Router } from 'express';
import { getLastStockEntry, getLatestStockEntries, listStocks } from './get';

const router = Router();
router.get('/latest', getLatestStockEntries);
router.get('/last', getLastStockEntry);
router.get('/', listStocks);

export default router;
