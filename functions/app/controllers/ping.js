import mongoose from 'mongoose';
import { Router } from 'express';
import { getConnection } from '../services';

const ping = async (req, resp) => {
  try {
    await getConnection();
    const databaseStatus = mongoose.connection.readyState;
    resp.json({ databaseStatus });
  } catch (err) {
    resp.status(500);
    resp.json({ error: err.message });
  }
};

export const getPingRoutes = () => {
  const router = Router();
  router.get('/', ping);
  return router;
};
