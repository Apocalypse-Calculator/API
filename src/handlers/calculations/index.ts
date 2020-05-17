import { Router } from 'express';
import { newCalculation } from './calculate';

const router = Router();
router.post('/', newCalculation);

export default router;
