# Hotel Email Marketing Platform

A monorepo for hotel email marketing applications built with React, TypeScript, and Vite.

## Structure

This monorepo uses pnpm workspaces and contains the following applications:

- `apps/client` - Main client application
- `apps/sample` - Sample/demo application

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

```bash
# Install dependencies for all workspaces
pnpm install
```

### Development

```bash
# Run all applications in development mode
pnpm dev

# Run a specific application
pnpm --filter @hotel-email-marketing/client dev
pnpm --filter @hotel-email-marketing/sample dev
```

### Building

```bash
# Build all applications
pnpm build

# Build a specific application
pnpm --filter @hotel-email-marketing/client build
pnpm --filter @hotel-email-marketing/sample build
```

### Linting

```bash
# Lint all applications
pnpm lint

# Lint a specific application
pnpm --filter @hotel-email-marketing/client lint
```

## Workspace Commands

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all applications
- `pnpm test` - Run tests for all applications
- `pnpm clean` - Clean build artifacts

## Applications

### Client (`apps/client`)
Main client application built with React, TypeScript, and Vite.

### Sample (`apps/sample`)
Sample/demo application showcasing hotel email marketing features.

## Contributing

1. Make your changes in the appropriate workspace
2. Test your changes with `pnpm test`
3. Lint your code with `pnpm lint`
4. Build to ensure everything compiles with `pnpm build`
5. Commit your changes

## License

ISC
