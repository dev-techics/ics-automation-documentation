---

sidebar_position: 3
---

# Folder Structure

The ICS Automation frontend project is organized to promote scalability, maintainability, and modular development. Below is a breakdown of the folder structure and its purpose.

---

## Root Directory

```
ics-automation/
├─ .vscode/          # VS Code settings for the project
├─ build/            # Production build output
├─ public/           # Static files served as-is (like images, favicon)
├─ src/              # Main source code
├─ .env              # Environment variables
├─ package.json      # Project dependencies & scripts
├─ tsconfig.json     # TypeScript configuration
└─ vite.config.ts    # Vite configuration
```

## `src/` Directory

```
src/
├─ api/            # Axios instances and API helpers
├─ app/            # Redux store and central API hooks
├─ assets/         # Images, icons, and static assets
├─ components/     # Reusable UI components
├─ context/        # React context providers
├─ data/           # Static data like conditions, constants
├─ hooks/          # Custom React hooks
├─ layout/         # Layout components (DashboardLayout, WebsiteLayout)
├─ lib/            # Utility functions
├─ pages/          # Application pages grouped by module
├─ routes/         # Application routing setup
├─ types/          # TypeScript type definitions
├─ App.tsx         # Root React component
├─ main.tsx        # Entry point for React app
├─ index.css       # Global styles
└─ env.d.ts        # TypeScript declarations for environment variables
```

## Key Folders Explained

### `api/`

Contains the `axiosInstance.ts` file used for API requests. Centralizes HTTP logic and interceptors.

### `app/`

- `store.ts` – Configures Redux store.
- `api.ts` – API-related hooks for RTK Query or global API logic.

### `components/`

Holds reusable UI components:

- `ui/` – Generic UI elements like buttons, modals, tables, alerts, etc.
- `dashboard/` – Components specific to the dashboard like topbar, sidebar, custom selects, inputs.
- Other subfolders for specific areas like `flow-builder`, `template-builder`, etc.

### `context/`

Contains React Context providers for managing state that doesn't belong to Redux, e.g., dashboard-specific context.

### `hooks/`

Custom hooks for reusable logic, e.g., `redux-hook.ts` for typed Redux hooks, `use-mobile.ts` for responsive handling.

### `pages/`

Organized by module:

- `dashboard/` – Main admin panel features (flows, templates, contacts, segments).
- `website/` – Public-facing website pages.

Each module contains:

- `components/` – Module-specific components.
- `redux/` – Redux slices for state management.
- `types.ts` – TypeScript types for the module.
- Main page component (e.g., `FlowListPage.tsx`).

### `redux/` in each module

Redux slices using **Redux Toolkit**. Handles state updates, async actions (with **Redux Thunk**), and API integration for that module.

### `layout/`

Defines high-level layout components:

- `DashboardLayout.tsx` – Layout for admin pages.
- `WebsiteLayout.tsx` – Layout for public-facing pages.

---

## Summary

This folder structure ensures:

- **Modularity:** Each feature has its own folder with components, types, and state.
- **Scalability:** Easy to add new pages, features, and modules.
- **Maintainability:** Clear separation of concerns between UI, state, API, and utility code.
- **Type safety:** All TypeScript types organized in `types/` and module-specific type files.
- **Centralized API logic:** All API calls go through `api/` with Redux handling state
