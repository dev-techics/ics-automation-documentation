---
sidebar_position: 2
---

# Installation & Setup

This guide covers setting up the ICS Automation frontend for local development.

## Prerequisites

| Requirement | Version | Notes |
|------------|---------|-------|
| Node.js | >= 20.x | LTS recommended |
| npm | >= 10.x | Bundled with Node.js |
| Git | >= 2.x | For version control |
| Backend API | Running | See [Backend Installation](../Backend/installation-&-setup.md) |

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/dev-techics/ics-automation.git
cd ics-automation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=http://localhost:8000/api
```

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_BASE_URL` | Backend API base URL | Yes |

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `tsc -b` | Run TypeScript type checking |

## Build for Production

```bash
npm run build
```

This executes `tsc -b && vite build`, which:

1. Runs TypeScript compilation with project references
2. Bundles the application with Vite
3. Outputs optimized assets to `dist/`

## Project Configuration

### Vite Configuration

The build is configured in `vite.config.ts`:

```typescript
// Key configuration points
- React plugin for JSX/TSX transformation
- Tailwind CSS v4 plugin
- Path aliases (@/ maps to src/)
- Development server proxy settings
```

### TypeScript Configuration

The project uses three TypeScript configs:

| File | Purpose |
|------|---------|
| `tsconfig.json` | Root config referencing app and node configs |
| `tsconfig.app.json` | Application source type checking |
| `tsconfig.node.json` | Node.js build tool type checking |

### ESLint Configuration

Linting is handled by `eslint.config.js` with:

- `typescript-eslint` for TypeScript rules
- `eslint-plugin-react-hooks` for React hooks rules
- `eslint-plugin-react-refresh` for Fast Refresh compatibility

## IDE Setup

### VS Code Recommended Extensions

- **ESLint** — Real-time linting
- **Tailwind CSS IntelliSense** — Autocomplete for Tailwind classes
- **TypeScript and JavaScript Language Features** — Enhanced TS support

## Troubleshooting

### Port Already in Use

If port 5173 is occupied, Vite will automatically use the next available port. To specify a port:

```bash
npm run dev -- --port 3000
```

### TypeScript Errors on Build

Run type checking separately to isolate issues:

```bash
npx tsc -b
```

### API Connection Issues

Verify `VITE_BASE_URL` points to a running backend instance. The frontend expects the backend to be accessible and CORS-enabled.
