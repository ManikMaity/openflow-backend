import { Request, Response } from 'express';
import { logger } from '../config/logger.config';
import httpStatus from 'http-status';
import { redisInstance } from '../config/redis.config';
import { NODE_ENV } from '../config/server.config';
import { dbInstance } from '../config/db.config';
import { sql } from 'drizzle-orm';

export async function serverHealthCheckController(req: Request, res: Response) {
  const startTime = Date.now();
  try {
    let redisStatus = 'disconnected';
    let redisResponseTime = 0;
    let dbStatus = 'disconnected';
    let dbResponseTime = 0;
    const db = dbInstance();

    if (redisInstance()) {
      const redisStart = Date.now();
      try {
        await redisInstance().ping();
        redisStatus = 'connected';
        redisResponseTime = Date.now() - redisStart;
      } catch (error) {
        redisStatus = 'error';
        logger.error('Redis health check failed:', error);
      }
    }

    if (db) {
      const dbStart = Date.now();
      try {
        await db.execute(sql`SELECT 1`);
        dbStatus = 'connected';
        dbResponseTime = Date.now() - dbStart;
      } catch (error) {
        dbStatus = 'error';
        logger.error('Database health check failed:', error);
      }
    }

    const responseTime = Date.now() - startTime;
    const isHealthy = redisStatus === 'connected' && dbStatus === 'connected';

    const healthData = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: `${responseTime}ms`,
      environment: NODE_ENV,
      services: {
        redis: {
          status: redisStatus,
          responseTime: redisResponseTime ? `${redisResponseTime}ms` : null,
        },
        database: {
          status: dbStatus,
          responseTime: dbResponseTime ? `${dbResponseTime}ms` : null,
        },
        server: {
          status: 'running',
          version: process.version,
          memory: {
            used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
            total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
          },
        },
      },
    };

    const statusCode = isHealthy ? httpStatus.OK : httpStatus.SERVICE_UNAVAILABLE;

    res.status(statusCode).json(healthData);
  } catch (error) {
    logger.error('Health check failed:', error);

    res.status(httpStatus.SERVICE_UNAVAILABLE).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      services: {
        redis: { status: 'error' },
        server: { status: 'error' },
      },
    });
  }
}
