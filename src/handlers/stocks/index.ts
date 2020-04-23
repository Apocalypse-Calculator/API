import { Router } from 'express';
import { getLatestReport } from './get';

const router = Router();
router.get('/latest', getLatestReport);

export default router;
