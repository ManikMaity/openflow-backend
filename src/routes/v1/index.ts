import express from 'express';
import healthRouter from './health.route';

const router = express.Router();

// Health check route
router.use('/health', healthRouter);

export default router;
