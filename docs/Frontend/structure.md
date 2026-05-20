---
sidebar_position: 3
---

# Project Structure

The codebase follows a **feature-module architecture** where each business domain is self-contained. This section documents the directory layout and the responsibility of each directory.

## Root Layout

```
ics-automation/
├── public/                  # Static assets (favicon, images)
├── src/                     # Application source code
├── .env                     # Environment variables
├── components.json          # shadcn/ui configuration
├── eslint.config.js         # ESLint flat config
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript root config
├── tsconfig.app.json        # TypeScript app config
├── tsconfig.node.json       # TypeScript node config
├── vercel.json              # Vercel deployment config
└── vite.config.ts           # Vite build configuration
```

## Source Directory (`src/`)

```
src/
├── api/                     # HTTP client layer
│   ├── axiosInstance.ts     # Configured Axios instance
│   └── index.ts             # RTK Query base API
├── app/                     # Application-level configuration
│   ├── api.ts               # RTK Query API slice
│   └── store.ts             # Redux store configuration
├── assets/                  # Static assets (images, icons)
├── components/              # Shared UI components
│   ├── ui/                  # shadcn/ui primitives
│   ├── dashboard/           # Dashboard-specific shared components
│   ├── ComingSoon.tsx       # Placeholder component
│   └── NotFound.tsx         # 404 component
├── context/                 # React Context providers
│   └── dashboard-context/   # Dashboard UI state context
├── data/                    # Static data and constants
│   └── condition.ts         # Flow condition definitions
├── hooks/                   # Custom React hooks
│   ├── redux-hook.ts        # Typed Redux hooks
│   └── use-mobile.ts        # Responsive breakpoint hook
├── layout/                  # Top-level layout components
│   ├── DashboardLayout.tsx  # Authenticated dashboard layout
│   └── WebsiteLayout.tsx    # Public website layout
├── lib/                     # Utility functions
│   └── utils.ts             # cn() class merging utility
├── pages/                   # Route-level page components
│   ├── dashboard/           # Authenticated pages
│   └── website/             # Public pages
├── routes/                  # Routing configuration
│   ├── index.tsx            # Router initialization
│   ├── dashboard.tsx        # Dashboard route definitions
│   ├── website.tsx          # Website route definitions
│   └── ProtectedRoute.tsx   # Authentication guard
├── types/                   # Global TypeScript types
│   └── type.ts              # Shared type definitions
├── App.tsx                  # Root component
├── main.tsx                 # Application entry point
├── index.css                # Global styles
└── env.d.ts                 # Vite env variable declarations
```

## Feature Module Structure

Each feature module under `src/pages/dashboard/` follows a consistent internal structure:

```
<feature-name>/
├── components/              # Module-specific components
│   ├── common/              # Shared within module
│   └── ...                  # Feature-specific subdirectories
├── redux/                   # State management
│   └── <feature>Slice.ts    # Redux Toolkit slice
├── types.ts                 # Module-specific TypeScript types
└── <Feature>Page.tsx        # Page component (route entry point)
```

### Example: Flow Builder Module

```
create-flow/
├── components/
│   ├── common/              # Shared sidebar components
│   ├── flow-area/           # React Flow canvas
│   │   ├── components/      # Custom node components
│   │   │   ├── ConditionNode.tsx
│   │   │   ├── DelayNode.tsx
│   │   │   ├── EmailNode.tsx
│   │   │   ├── SmsNode.tsx
│   │   │   └── TriggerNode.tsx
│   │   └── FlowArea.tsx     # Canvas configuration
│   ├── header/              # Editor toolbar
│   ├── left-sidebar/        # Node palette
│   └── right-sidebar/       # Node configuration panel
│       ├── components/
│       │   └── ui/          # Template dialogs, previews
│       └── RightSidebar.tsx
├── redux/
│   └── createFlowSlice.ts   # Flow state management
├── type.ts                  # Flow-specific types
└── CreateFlowPage.tsx       # Page entry point
```

## Component Library (`src/components/`)

### UI Primitives (`src/components/ui/`)

shadcn/ui components built on Radix UI primitives:

| Component | Source | Purpose |
|-----------|--------|---------|
| `alert-dialog.tsx` | Radix AlertDialog | Confirmation dialogs |
| `avatar.tsx` | Radix Avatar | User avatars |
| `badge.tsx` | Custom | Status badges |
| `button.tsx` | Radix + CVA | Button variants |
| `card.tsx` | Custom | Card containers |
| `checkbox.tsx` | Radix Checkbox | Form checkboxes |
| `dialog.tsx` | Radix Dialog | Modal dialogs |
| `dropdown-menu.tsx` | Radix DropdownMenu | Dropdown menus |
| `input.tsx` | Custom | Text inputs |
| `label.tsx` | Radix Label | Form labels |
| `scroll-area.tsx` | Radix ScrollArea | Scrollable containers |
| `select.tsx` | Radix Select | Dropdown selects |
| `separator.tsx` | Radix Separator | Visual dividers |
| `sheet.tsx` | Radix Dialog | Slide-out panels |
| `sidebar.tsx` | Custom | Collapsible sidebar |
| `skeleton.tsx` | Custom | Loading placeholders |
| `table.tsx` | Custom | Data tables |
| `textarea.tsx` | Custom | Multi-line inputs |
| `tooltip.tsx` | Radix Tooltip | Hover tooltips |

### Dashboard Components (`src/components/dashboard/`)

Shared components used across dashboard pages:

| Component | Purpose |
|-----------|---------|
| `DashboardSidebar.tsx` | Main navigation sidebar |
| `Topbar.tsx` | Top bar wrapper |
| `DashboardTopbar.tsx` | Dashboard-specific top bar |
| `CustomSelect.tsx` | Reusable select component |
| `InputWithLabel.tsx` | Labeled input wrapper |

## State Management Structure

### Redux Store (`src/app/store.ts`)

The store aggregates all feature slices:

```
store.ts
├── flowList          # Flow list page state
├── createFlow        # Flow builder state
├── createTemplate    # Template builder state (legacy)
├── segmentList       # Segment list state
├── templateBuilder   # Template builder state
├── templateList      # Template list state
├── importContact     # Contact import state
├── smsTemplateBuilder # SMS template state
└── unsubscribe       # Unsubscribe page state
```

### React Context (`src/context/`)

| Context | Purpose |
|---------|---------|
| `DashboardContext` | Sidebar visibility, selected node, dialog states |

## API Layer (`src/api/`)

| File | Purpose |
|------|---------|
| `axiosInstance.ts` | Configured Axios instance with base URL, credentials, timeout |
| `index.ts` | RTK Query `createApi` base configuration |

## Routing Structure (`src/routes/`)

| File | Purpose |
|------|---------|
| `index.tsx` | `createBrowserRouter` initialization, top-level route tree |
| `dashboard.tsx` | All `/dashboard/*` route definitions |
| `website.tsx` | All public route definitions |
| `ProtectedRoute.tsx` | Authentication guard wrapper |
