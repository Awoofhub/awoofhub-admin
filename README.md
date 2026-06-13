## 1. Project Overview

**Project Name:** AwoofHub

**Type:** Community-Driven Deal Discovery Platform

**Purpose:** To help Nigerian consumers discover, share, save, and redeem verified deals, discounts, freebies, and promotions through a trusted community-powered platform where users can contribute, rate, and discover the best offers available.


## 2. Folder Structure

The admin application follows a feature-based architecture built on Next.js App Router, separating routing, UI components, business logic, and API communication.

### app/
Application routes, layouts, and pages.

- `(auth)/` → Authentication pages (login, password reset)
- `(main)/` → Main admin application routes
  - `dashboard/` → Admin analytics and management
  - `offers/` → Offer moderation and management
  - `reports/` → Report review and moderation
  - `users/` → User administration
  - `comments/` → Comment moderation
  - `category/` → Category management
- `layout.tsx` → Root application layout
- `globals.css` → Global styles
- `error.tsx` → Global error boundary
- `not-found.tsx` → 404 page

### components/
Reusable UI components organized by domain.

- `offers/` → Offer management tables, filters, and moderation UI
- `reports/` → Report management components
- `users/` → User management components
- `dashboard/` → Dashboard widgets and statistics
- `header/` → Navigation and sidebar components
- `form/` → Shared form controls
- `button/` → Reusable button components

**Purpose:** Presentation layer only. Components should not contain API calls or business logic.

### features/
Feature-specific business logic and server-state management.

- `auth/` → Authentication workflows
- `offers/` → Offer moderation logic
- `reports/` → Report review and moderation
- `comments/` → Comment management
- `user/` → User administration
- `category/` → Category management
- `dashboard/` → Dashboard analytics

**Purpose:** Encapsulates feature logic, React Query hooks, and stateful behavior.

### services/
Backend communication layer.

- `auth-service.ts` → Authentication API calls
- `offer-service.ts` → Offer management APIs
- `report-service.ts` → Report moderation APIs
- `user-service.ts` → User management APIs
- `dashboard-service.ts` → Dashboard analytics APIs

**Purpose:** Centralizes all backend requests and external service interactions.

### providers/
Application-wide providers and configuration.

- `app-provider.tsx` → Global application providers
- `react-query-provider.tsx` → React Query configuration

**Purpose:** Initializes global context and application dependencies.

### store/
Global client-side state management.

- `notifications/` → Notification state and actions

**Purpose:** Stores shared client-side state.

### types/
Shared TypeScript domain models and API contracts.

- `auth.ts`
- `user.ts`
- `offer.ts`
- `report.ts`
- `comment.ts`

**Purpose:** Provides strongly typed models across the application.

### lib/
Core infrastructure utilities.

- `api-client.ts` → Base API client
- `utils.ts` → Shared low-level helpers

**Purpose:** Contains foundational utilities used across features.

### utils/
Reusable helper functions.

- Date formatting
- String manipulation
- ID generation

**Purpose:** Contains pure utility functions with no side effects.

### public/
Static assets and images.

- Logos
- Error illustrations
- Application branding assets

**Purpose:** Stores publicly accessible static files.