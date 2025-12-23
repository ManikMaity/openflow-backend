process.on("uncaughtException", (error) => {
  logger.error("❌ UNCAUGHT EXCEPTION:", error);
  process.exit(1);
});

import app from "./app";
import { logger } from "./config/logger.config";
import { connectRedis } from "./config/redis.config";

import { BACKEND_URL, PORT } from "./config/server.config";
import { ApiError } from "./utils/error.util";

(async () => {
  try {

    await connectRedis();

    const server = app.listen(PORT, () => {
      logger.info(`🔥 Server running on ${BACKEND_URL}`);
    });

    process.on("unhandledRejection", (reason) => {
      logger.error("❌ UNHANDLED REJECTION:", reason);
      server.close(() => process.exit(1));
    });

    const shutdown = (signal: string) => {
      logger.info(`🛑 ${signal} received. Shutting down...`);
      server.close(() => process.exit(0));
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);

  } catch (error : any) {
    logger.error("❌ Failed to start server:", (error as ApiError)?.message || error?.message);
    process.exit(1);
  }
})();
