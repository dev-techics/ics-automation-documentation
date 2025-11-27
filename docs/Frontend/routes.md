---

title: "Routing"
sidebar_position: 3
---

# Routing Overview

This page explains how routing is structured in the **ICS Automation frontend** using **React Router v6**.

---

## Router Setup

We use **`createBrowserRouter`** from `react-router-dom` to configure all routes in a single file `routes/index.tsx`

```text title="src\routes\index.tsx"
routes/
├─ dashboard.tsx
├─ index.tsx
└─ website.tsx
```

**This is how `index.tsx` holding the routes**

```javascript text title="src\routes\index.tsx"
const routes = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout />, // Wrap with Website Layout.
    children: [...WebRoutes],
  },
  {
    path: "/dashboard",
    element: <Dashboard />, //  Wrap with Dashboard Layout
    children: [...DashboardRoutes],
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);
```
