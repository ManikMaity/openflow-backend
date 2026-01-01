import Redis from "ioredis";
import {
  NODE_ENV,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USERNAME,
} from "./server.config";
import { logger } from "./logger.config";

let redis: Redis | null = null;
let connectingPromise: Promise<Redis> | null = null; // ensure single connect

function makeRedisUrl(): string {
  let url = `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;
  if (NODE_ENV === "production") {
    url = `rediss://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;
  }
  // Don't log Redis URL in production to avoid exposing credentials
  if (NODE_ENV !== "production") {
    logger.debug("Redis connection configured");
  }
  return url;
}

export const connectRedis = async (): Promise<Redis> => {
  if (redis) return redis; // already connected
  if (connectingPromise) return connectingPromise; // connection in progress

  redis = new Redis(makeRedisUrl(), {
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    reconnectOnError: (err) => {
      logger.error("❌ Redis reconnect error:", err.message);
      return true;
    },
  });

  redis.once("ready", () => {
    logger.info("✅ Redis is ready and fully connected");
  });

  redis.on("error", (err) => {
    logger.error("❌ Redis connection error:", err.message);
  });

  connectingPromise = redis
    .connect()
    .then(() => {
      connectingPromise = null; // reset after successful connect
      return redis!;
    })
    .catch((err) => {
      connectingPromise = null;
      logger.error("❌ Failed to connect to Redis:", err);
      process.exit(1);
    });

  return connectingPromise;
};

export const redisInstance = (): Redis => {
  if (!redis)
    throw new Error("Redis not initialized. Call connectRedis() first.");
  return redis;
};
