import Redis from "ioredis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME } from "./server.config";
import { logger } from "./logger.config";

let redis: Redis | null = null;


export const connectRedis = async (): Promise<Redis> => {
    try {
        if (!redis) {
            redis = new Redis({
                host: REDIS_HOST,
                port: REDIS_PORT,
                username : REDIS_USERNAME,
                password: REDIS_PASSWORD,
                retryStrategy: (times) => Math.min(times * 1000, 3000)
            });

            redis.on("connect", () => {
                logger.info("✅ Redis is connected successfully");
            });

            redis.on("error", (err) => {
                logger.error("❌ Redis connection error:", err.message);
            });
        }

        // Ensure Redis is actually reachable
        const pong = await redis.ping();
        logger.info(`✅ Redis ping response: ${pong}`);

        return redis;
    } catch (err) {
        if (err instanceof Error) {
            logger.error("❌ Redis connection failed:", err.message);
        }
        process.exit(1);
    }
};

export const redisInstance = (): Redis => {
    if (!redis) {
        throw new Error("Redis not initialized. Call connectRedis() first.");
    }
    return redis;
};