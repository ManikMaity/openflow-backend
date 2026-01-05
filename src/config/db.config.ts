import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DB_URL } from './server.config';
import { logger } from './logger.config';
import * as schema from './../db/schema';

let client: ReturnType<typeof postgres> | null = null;
export let db: PostgresJsDatabase<typeof schema> | null = null;

export type DB = PostgresJsDatabase<typeof schema>;

export function connectDatabase() {
  if (!client) {
    client = postgres(DB_URL!, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
    db = drizzle(client, { schema });
  }
  logger.info('✅ Database connected successfully');
  return db;
}

export function dbInstance(): DB {
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
