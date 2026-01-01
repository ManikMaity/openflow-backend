import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './migrations',
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: Bun.env.DB_URL!,
  },
});
