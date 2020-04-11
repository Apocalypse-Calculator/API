import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';

const DBStatus = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

const ping = async (req: Request, resp: Response): Promise<void> => {
  const mongoDB = DBStatus[mongoose.connection.readyState];
  resp.json({
    status: { mongoDB },
  });
};

const router = Router();
router.get('/', ping);
export default router;
