---

sidebar_position: 1
---

# Overview

The ICS Automation frontend is a modern, high-performance web application built using a clean and scalable technology stack. It is designed to deliver a smooth user experience for creating flows, editing templates, managing contacts, and handling automation logic visually.

---

## Technology Stack

We use a combination of powerful frontend tools to build a flexible and maintainable application.

### React

React is the core framework powering the application UI. It provides:

- Component-based architecture
- Reusable UI logic
- Fast rendering with the Virtual DOM
- Easy state and data management

### TypeScript

The entire frontend is written in TypeScript to ensure:

- Strict type safety
- Better maintainability
- Improved developer experience
- Fewer runtime errors

### Tailwind CSS

Tailwind is used for styling and layout. It provides:

- A utility-first approach
- Rapid UI development
- Consistent design system
- Responsive and mobile-friendly layouts

### shadcn/ui

We use shadcn/ui components for:

- Buttons
- Dialogs and modals
- Dropdown menus
- Form elements
- Layout components

These components help maintain consistency across the application.

---

## Major Frontend Modules

### Dashboard

The dashboard serves as the main workspace and includes:

- Flow list
- Campaigns
- Templates
- Segments
- Activity metrics

### Flow Builder (React Flow)

The Flow Builder is a drag-and-drop editor that allows users to create automation workflows visually. It includes:

- Trigger nodes
- Email, SMS, Delay, and Condition nodes
- Multiple connection paths
- Real-time flow updates
- Node repositioning and linking

### Template Editor (Unlayer)

Our email template editor lets users design emails visually. It supports:

- Drag-and-drop content blocks
- Text, images, layouts, and buttons
- Style customization
- HTML generation
- Saving and updating templates easily

### Forms and Modals

Reusable modal components are used for actions such as:

- Creating or editing flows
- Managing templates
- Adding or updating contacts
- Showing confirmation messages

### API Integration

The frontend communicates with the backend using:

- REST API endpoints
- Axios for handling HTTP requests
- Token-based authentication
- Real-time sync with automation actions

---

## Architecture Highlights

- Component-based structure
- Type-safe interfaces and models
- Reusable UI components
- Clear folder separation
- Optimized builds through Vite
- Clean and scalable codebase

---

## Summary

The ICS Automation frontend is designed to be:

- Fast
- Scalable
- Developer-friendly
- Visually consistent
- Easy to maintain

This architecture ensures a smooth experience for users working with flows, templates, contacts, and marketing automation.
