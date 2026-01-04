import express from 'express';
import healthRouter from './health.route';
import authRouter from './auth.route';

const router = express.Router();

// Health check route
router.use('/health', healthRouter);
router.use('/auth', authRouter);

export default router;
