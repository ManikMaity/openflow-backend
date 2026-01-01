import { Request, Response } from "express";
import { redisInstance } from "../../config/redis.config";
import { logger } from "../../config/logger.config";
import { NODE_ENV } from "../../config/server.config";
import httpStatus from "http-status";

export const healthCheck = async (req: Request, res: Response) => {
  const startTime = Date.now();

  try {
    // Check Redis connection
    let redisStatus = "disconnected";
    let redisResponseTime = 0;

    if (redisInstance()) {
      const redisStart = Date.now();
      try {
        await redisInstance().ping();
        redisStatus = "connected";
        redisResponseTime = Date.now() - redisStart;
      } catch (error) {
        redisStatus = "error";
        logger.error("Redis health check failed:", error);
      }
    }

    const responseTime = Date.now() - startTime;
    const isHealthy = redisStatus === "connected";

    const healthData = {
      status: isHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: `${responseTime}ms`,
      environment: NODE_ENV,
      services: {
        redis: {
          status: redisStatus,
          responseTime: redisResponseTime ? `${redisResponseTime}ms` : null,
        },
        server: {
          status: "running",
          version: process.version,
          memory: {
            used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
            total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
          },
        },
      },
    };

    const statusCode = isHealthy
      ? httpStatus.OK
      : httpStatus.SERVICE_UNAVAILABLE;

    res.status(statusCode).json(healthData);
  } catch (error) {
    logger.error("Health check failed:", error);

    res.status(httpStatus.SERVICE_UNAVAILABLE).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Health check failed",
      services: {
        redis: { status: "error" },
        server: { status: "error" },
      },
    });
  }
};
