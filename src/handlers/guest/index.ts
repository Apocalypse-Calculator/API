import { Router } from 'express';
import { addGuestStocks } from './create';

const router = Router();
router.post('/stocks', addGuestStocks);

export default router;
