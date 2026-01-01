import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DB_URL } from './server.config';
import { logger } from './logger.config';
let client: ReturnType<typeof postgres> | null = null;
export let db: ReturnType<typeof drizzle> | null = null;
export function connectDatabase() {
  if (!client) {
    client = postgres(DB_URL!, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
    db = drizzle(client);
  }
  logger.info('✅ Database connected successfully');
  return db;
}

export function dbInstance() {
  if (!db) {
    throw new Error('Database not connected. Call connectDatabase() first.');
  }
  return db;
}

export async function closeDatabase() {
  if (client) {
    await client.end();
    client = null;
    db = null;
  }
}
