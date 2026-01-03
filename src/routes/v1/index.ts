import express from 'express';
import healthRouter from './health.route';

const router = express.Router();

// Health check route
router.use('/health', healthRouter);

// Test error route
router.get('/error', (req, res, next) => {
  next(new Error('Test error'));
});

export default router;
