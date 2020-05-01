import { Request, Response, Router } from 'express';
import { dbConnectionStatus } from '~/src/storage';

export const ping = async (req: Request, resp: Response): Promise<void> => {
  const db = dbConnectionStatus();
  const code = db === 'connected' ? 200 : 500;
  resp.status(code).json({
    status: { db },
  });
};

const router = Router();
router.get('/', ping);
export default router;
