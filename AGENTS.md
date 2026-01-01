# AGENTS.md

This file contains essential information for agentic coding agents working in this repository.

## Project Overview

This is a Node.js/Express API server built with TypeScript, using Bun as the runtime. It follows a clean architecture with controllers, routes, middleware, utils, and config modules. The server includes health checks, Redis integration, Winston logging, and comprehensive error handling.

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

### Testing

No test framework is currently configured. When adding tests:

1. Choose an appropriate test framework (Jest, Vitest, etc.)
2. Add test scripts to package.json
3. Follow the existing code patterns and conventions

## Code Style Guidelines

### Imports

- Use ES6 import/export syntax
- Group imports in this order: external libraries → internal modules → relative imports
- No unused imports allowed (enforced by ESLint)

### TypeScript Configuration

- Strict mode enabled
- ES2022 target with ESNext modules
- No explicit `any` types (warned by ESLint)
- Use proper type annotations for function parameters and return types

### Formatting (Prettier)

- Semicolons: required
- Quotes: single quotes
- Print width: 100 characters
- Tab width: 2 spaces
- Trailing commas: where valid in ES5

### Naming Conventions

- **Files**: kebab-case (e.g., `health.controller.ts`, `server.config.ts`)
- **Variables/Functions**: camelCase
- **Classes**: PascalCase (e.g., `ApiError`)
- **Constants**: UPPER_SNAKE_CASE for exports (e.g., `ERROR_CODES_MAP`)
- **Enums**: PascalCase with UPPER_SNAKE_CASE values (e.g., `ERROR_CODE_MESSAGES.USER_NOT_FOUND`)

### Error Handling

- Use the `ApiError` class for operational errors
- Follow the error code pattern in `ERROR_CODES_MAP`
- Always include proper error codes and messages
- Use try-catch blocks with proper logging via `logger.error()`
- Errors should be operational by default

### File Structure Patterns

```
src/
├── config/          # Configuration modules
├── controllers/     # Request handlers
├── middlewares/     # Express middleware
├── routes/v1/       # API routes (versioned)
├── types/           # TypeScript types and enums
├── utils/           # Utility functions
├── app.ts           # Express app setup
└── server.ts        # Server startup and graceful shutdown
```

### Controller Patterns

- Controllers should be async functions that accept `(req: Request, res: Response)`
- Use proper HTTP status codes from `http-status` package
- Return JSON responses consistently
- Include error handling with try-catch blocks
- Log errors appropriately

### Configuration Management

- Use `Bun.env.VARIABLE_NAME` for environment variables
- Export configuration objects from individual config files
- Provide sensible defaults where appropriate
- Keep sensitive data in environment variables only

### Middleware Usage

- Security: helmet, cors with proper origin configuration
- Logging: morgan for HTTP request logging
- Error handling: centralized error converter and handler
- Rate limiting: express-rate-limit with Redis storage

### Redis Integration

- Use the singleton pattern via `redisInstance()` function
- Handle Redis connection errors gracefully
- Include Redis health checks in monitoring
- Use Redis for rate limiting and caching where appropriate

### Logging Guidelines

- Use Winston logger for structured logging
- Different log levels for development vs production
- Include context and error details in logs
- Use appropriate log levels: error, warn, info, debug

## Development Workflow

1. Always run `bun run typecheck` before committing
2. Use `bun run lint:fix` to fix linting issues automatically
3. Format code with `bun run format`
4. Follow the existing architectural patterns when adding new features
5. Ensure all environment variables are properly documented
6. Add appropriate error codes to the `ERROR_CODES_MAP` when introducing new error scenarios

## Technology Stack

- **Runtime**: Bun
- **Framework**: Express.js
- **Language**: TypeScript (strict mode)
- **Database**: Redis (for caching and rate limiting)
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Zod (imported but usage patterns to be established)

## Important Notes

- No build step is required (Bun handles TypeScript compilation)
- The server includes graceful shutdown handling
- Health check endpoint available at `/api/v1/health`
- All routes are prefixed with `/api/v1`
- Environment variables should be configured before running the server
