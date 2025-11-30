---
title: "Layout"
sidebar_position: 4
---

# Layout

`src/layout` directory contain all the directory of the layout that used in our project.

```text title="src/layout"
layout/
├─ DashboardLayout.tsx
└─ WebsiteLayout.tsx

```

**DashboardLayout.tsx**

This is the main main layout wrapper for the dashboard pages.

**WebsiteLayout.tsx**
This is the layout for the website of this page.

:::warning Website Layout

We built this product with the future in mind. We will create a website for it later. So we we created a demo layout `WebsiteLayout.tsx` for the website.

:::

### Layout Example

This is an primary layout for the dashboard.

```javascript
const DashboardLayout = () => {

  // this checking for hide layout for specific route
  const matches = useMatches();
  const current = matches[matches.length - 1] as { handle?: RouteHandle };
  const showLayout = current?.handle?.layout !== false;
  if (!showLayout) return <Outlet />;

  return (
    <div>
       <TopBar>
      <div>
        <Sidebar>
        <main>
           <Outlet />    // Load layout content
        </main>
      </div>
    </div>
  );
};
```

### Hide Layout for a specific route

If you want to hide the layout for specific page we just have to set layout false like this

```typescript title="src\routes\dashboard.tsx"
---
{
    path: "flows/:id?",
    element: <CreateFlowPage />,
    handle: { layout: false },
}
---
```
