# openflow - backend

An automation backend inspired by n8n.

## Design

- [diagram](https://app.eraser.io/workspace/9LgGN051ixcFR08BG5QW?origin=share&elements=h-4qMM-x8P3Q_z3F3ExSFg)

## Installation

```bash
bun install
```

## Running

```bash
# Start Redis
docker-compose up -d

# Development
bun run dev

# Production
bun run start
```

## Type Checking

```bash
bun run typecheck
```
