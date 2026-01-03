# OpenFlow - Backend

A powerful automation flow builder backend inspired by n8n, designed to create, manage, and execute complex workflow automations.

## Overview

OpenFlow is a Node.js/Express API server that provides the foundation for building automation workflows similar to n8n. It features a clean architecture with TypeScript, PostgreSQL for data persistence, Redis for caching and rate limiting, and comprehensive error handling.

## Architecture

- **Runtime**: Bun for optimal performance
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Cache**: Redis for session management and rate limiting
- **Security**: Helmet, CORS, and rate limiting middleware
- **Logging**: Winston for structured logging
- **Health Checks**: Comprehensive service monitoring

## Design

- [Architecture Diagram](https://app.eraser.io/workspace/9LgGN051ixcFR08BG5QW?origin=share&elements=h-4qMM-x8P3Q_z3F3ExSFg)

## Features

- **User Management**: Authentication and authorization system
- **Workflow Engine**: Create and manage automation flows
- **Node System**: Extensible node types for different integrations
- **Execution Engine**: Run workflows with scheduling and triggers
- **API-First**: RESTful API for all operations
- **Health Monitoring**: Real-time service health checks
- **Graceful Shutdown**: Proper cleanup and resource management

## Quick Start

### Prerequisites

- Bun runtime
- Docker and Docker Compose
- PostgreSQL and Redis (via Docker Compose)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd rbac

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env
```

### Running the Application

```bash
# Start infrastructure services (PostgreSQL, Redis)
docker-compose up -d

# Development mode with hot reload
bun run dev

# Production mode
bun run start
```

## API Endpoints

### Health Check

- `GET /api/v1/health` - Service health status

### User Management

- User authentication and authorization endpoints (coming soon)

### Workflow Management

- Workflow CRUD operations (coming soon)

## Development

### Code Quality

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

# Push schema changes
bun run db:push

# Open Drizzle Studio
bun run db:studio
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database Configuration
DB_URL=postgresql://postgres:postgres123@localhost:5432/openflow

# Redis Configuration
REDIS_PASSWORD=redis123
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=default

# Server Configuration
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3000
PORT=3000
NODE_ENV=development
```

## Project Structure

```
src/
├── config/          # Configuration modules (database, Redis, server)
├── controllers/     # Request handlers
├── db/             # Database schemas and migrations
├── middlewares/     # Express middleware
├── routes/v1/      # API routes (versioned)
├── types/          # TypeScript types and enums
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── server.ts       # Server startup and graceful shutdown
```

## Technology Stack

- **Runtime**: Bun
- **Framework**: Express.js
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL with Drizzle ORM
- **Cache**: Redis
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Validation**: Zod

## Monitoring

The application includes comprehensive health checks at `/api/v1/health` that monitor:

- Database connectivity and response time
- Redis connectivity and response time
- Server status and memory usage
- Overall service health

## License

This project is licensed under the MIT License.
