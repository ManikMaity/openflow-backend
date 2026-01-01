import app from "./app";
import { logger } from "./config/logger.config";
import { connectRedis } from "./config/redis.config";
import { BACKEND_URL, PORT } from "./config/server.config";
import { ApiError } from "./utils/error.util";

// Handle uncaught exceptions after imports are loaded
process.on("uncaughtException", (error) => {
  logger.error("❌ UNCAUGHT EXCEPTION:", error);
  process.exit(1);
});

(async () => {
  try {
    // Connect to Redis first
    await connectRedis();

    // Start Express server
    const server = app.listen(PORT, () => {
      logger.info(`🔥 Server running on ${BACKEND_URL}`);
    });

    // Handle unhandled rejections with proper cleanup
    process.on("unhandledRejection", (reason, promise) => {
      logger.error("❌ UNHANDLED REJECTION at:", promise, "reason:", reason);
      server.close(() => {
        logger.info("Server closed due to unhandled rejection");
        process.exit(1);
      });
    });

    // Graceful shutdown handler
    const shutdown = (signal: string) => {
      logger.info(`🛑 ${signal} received. Shutting down gracefully...`);
      server.close((err) => {
        if (err) {
          logger.error("Error during server shutdown:", err);
          process.exit(1);
        } else {
          logger.info("Server closed successfully");
          process.exit(0);
        }
      });
    };

    // Register shutdown handlers
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error: any) {
    logger.error(
      "❌ Failed to start server:",
      (error as ApiError)?.message || error?.message,
    );
    process.exit(1);
  }
})();
