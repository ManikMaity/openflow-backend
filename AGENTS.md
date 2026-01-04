# AGENTS.md

This file contains essential information for agentic coding agents working in this repository.

## Project Overview

This is OpenFlow, a Node.js/Express API server built with TypeScript, using Bun as the runtime. It's designed as an n8n-like automation flow builder with a clean architecture featuring controllers, routes, middleware, utils, and config modules. The server includes health checks, PostgreSQL integration via Drizzle ORM, Redis for caching, Winston logging, and comprehensive error handling.

## Essential Commands

### Development Commands

```bash
# Start development server with hot reload
bun run dev

# Start production server
bun run start
```

### Quality Assurance

```bash
# Type checking
bun run typecheck

# Linting
bun run lint
bun run lint:fix

# Code formatting
bun run format
```

### Database Operations

```bash
# Generate database migrations
bun run db:generate

# Run database migrations
bun run db:migrate

# Push schema changes to database
bun run db:push

# Open Drizzle Studio for database management
bun run db:studio

# Check database configuration
bun run db:check
```

### Testing

No test framework is currently configured. When adding tests:

1. Choose an appropriate test framework (Jest, Vitest recommended for Bun)
2. Add test scripts to package.json following this pattern:
   ```json
   "test": "vitest",
   "test:watch": "vitest --watch",
   "test:coverage": "vitest --coverage",
   "test:single": "vitest run"
   ```
3. Follow the existing code patterns and conventions
4. Test files should be co-located with source files or in `__tests__` directories

## Code Style Guidelines

### Imports

- Use ES6 import/export syntax exclusively
- Group imports in this order: external libraries → internal modules → relative imports
- Use type-only imports when possible: `import type { Request } from 'express'`
- No unused imports allowed (enforced by ESLint)
- Example import structure:

  ```typescript
  // External libraries
  import express from 'express';
  import { Request, Response } from 'express';

  // Internal modules
  import { logger } from '../config/logger.config';
  import { ApiError } from '../utils/error.util';

  // Relative imports
  import { UserSchema } from './user.schema';
  ```

### TypeScript Configuration

- Strict mode enabled with comprehensive type checking
- ES2022 target with ESNext modules and bundler resolution
- No explicit `any` types (warned by ESLint, prefer `unknown`)
- Use proper type annotations for function parameters and return types
- Use `ReturnType<typeof function>` for complex return types
- Prefer `interface` over `type` for object shapes unless using unions

### Formatting (Prettier)

- Semicolons: required
- Quotes: single quotes
- Print width: 100 characters
- Tab width: 2 spaces
- Trailing commas: where valid in ES5
- No trailing whitespace

### Naming Conventions

- **Files**: kebab-case (e.g., `health.controller.ts`, `server.config.ts`)
- **Variables/Functions**: camelCase
- **Classes**: PascalCase (e.g., `ApiError`, `UserController`)
- **Constants**: UPPER_SNAKE_CASE for exports (e.g., `ERROR_CODES_MAP`)
- **Enums**: PascalCase with UPPER_SNAKE_CASE values (e.g., `ERROR_CODE_MESSAGES.USER_NOT_FOUND`)
- **Interfaces**: PascalCase with `I` prefix optional (e.g., `IUserRepository` or `UserRepository`)
- **Types**: PascalCase with descriptive names (e.g., `CreateUserDto`)

### Error Handling

- Use the `ApiError` class for operational errors
- Follow the error code pattern in `ERROR_CODES_MAP`
- Always include proper error codes and messages
- Use try-catch blocks with proper logging via `logger.error()`
- Errors should be operational by default (isOperational = true)
- Include error context in logs: `logger.error('Operation failed', { error, context })`
- Use specific error codes from `ERROR_CODE_MESSAGES` enum

### Database Patterns

- Use Drizzle ORM with PostgreSQL
- Follow singleton pattern for database connections
- Use `dbInstance()` for accessing the database instance
- Connection management via `connectDatabase()` and `closeDatabase()`
- Schema files in `src/db/schema/` with proper exports
- Use Zod for validation and type safety with database schemas
- Always use transactions for multi-table operations
- Database configuration should use environment variables with defaults

### Redis Patterns

- Use singleton pattern via `redisInstance()` function
- Connection management via `connectRedis()` function
- Handle Redis connection errors gracefully with proper logging
- Include Redis health checks in monitoring endpoints
- Use Redis for rate limiting, session storage, and caching
- Connection URL should support both dev and production (redis/rediss)
- Implement proper error handling and reconnection logic

### File Structure Patterns

```
src/
├── config/          # Configuration modules (db, redis, server, logger)
├── controllers/     # Request handlers (async functions)
├── db/             # Database schemas and migrations
│   └── schema/      # Drizzle schema definitions
├── middlewares/     # Express middleware (auth, validation, error)
├── routes/v1/       # API routes (versioned, organized by feature)
├── types/           # TypeScript types and enums
├── utils/           # Utility functions and helpers
├── app.ts           # Express app setup and middleware configuration
└── server.ts        # Server startup and graceful shutdown
```

### Controller Patterns

- Controllers should be async functions that accept `(req: Request, res: Response)`
- Export controllers individually: `export async function createUserController(req, res)`
- Use proper HTTP status codes from `http-status` package
- Return JSON responses consistently with proper structure
- Include comprehensive error handling with try-catch blocks
- Log errors appropriately with context
- Validate input using Zod schemas before processing
- Use dependency injection for services and repositories

### Configuration Management

- Use `Bun.env.VARIABLE_NAME` for environment variables
- Export configuration objects from individual config files
- Provide sensible defaults where appropriate
- Keep sensitive data in environment variables only
- Validate required environment variables at startup
- Use proper TypeScript types for configuration objects
- Support both development and production environments

### Middleware Usage

- Security: helmet, cors with proper origin configuration
- Logging: morgan for HTTP request logging
- Error handling: centralized error converter and handler
- Rate limiting: express-rate-limit with Redis storage
- Authentication: JWT-based middleware (to be implemented)
- Validation: Zod schema validation middleware
- Request/response logging for debugging

### Logging Guidelines

- Use Winston logger for structured logging
- Different log levels for development vs production
- Include context and error details in logs
- Use appropriate log levels: error, warn, info, debug
- Log format should be structured JSON in production
- Include request IDs for tracing when possible
- Log security events and errors separately
- Use emojis for visual clarity in development logs

## Development Workflow

1. Always run `bun run typecheck` before committing
2. Use `bun run lint:fix` to fix linting issues automatically
3. Format code with `bun run format`
4. Follow the existing architectural patterns when adding new features
5. Ensure all environment variables are properly documented
6. Add appropriate error codes to the `ERROR_CODES_MAP` when introducing new error scenarios
7. Test database migrations before applying to production
8. Verify Redis connections in development environment
9. Use health check endpoint to verify service status

## Technology Stack

- **Runtime**: Bun (for optimal performance)
- **Framework**: Express.js
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL with Drizzle ORM
- **Cache**: Redis for session management and rate limiting
- **Logging**: Winston for structured logging
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Zod for schema validation
- **Testing**: To be implemented (Vitest recommended)

## Important Notes

- No build step is required (Bun handles TypeScript compilation)
- The server includes graceful shutdown handling for all services
- Health check endpoint available at `/api/v1/health`
- All routes are prefixed with `/api/v1`
- Environment variables should be configured before running the server
- Database migrations should be run before starting the application
- Redis should be running for full functionality
- Use Docker Compose for local development environment setup
