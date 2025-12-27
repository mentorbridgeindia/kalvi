# Feature 1 — Initial Setup & Authentication (WorkOS + Roles)

## Objective

Implement the **initial application setup and authentication system** using **WorkOS AuthKit** with **role-based access control**.

This feature must be:

- Enterprise-grade
- Scalable
- Fully typed
- SOLID and DRY compliant
- Aligned with cursorrules.md

Do **not** implement any future features.

---

## Scope (STRICT)

### Included

- Next.js App Router foundation
- Tailwind theme configuration
- TanStack Query setup
- MongoDB connection
- WorkOS authentication (login, callback, logout)
- User persistence
- Role system (USER / ADMIN)
- Route protection via middleware
- Reusable UI components (minimal set)
- Reusable auth hooks

### Excluded

- Admin dashboard UI
- Course / chapter / lesson features
- Quiz engine
- Leaderboard
- Animations
- PWA
- Email or notifications

---

## Global Constraints (MANDATORY)

- TypeScript strict mode
- No component > 180 lines
- Feature-first architecture
- No duplicated logic
- No raw `<button>` usage
- UI components must come from `/ui`
- No hardcoded colors
- No `any`
- No TODOs or placeholders
- No future-feature scaffolding

---

## Step 1: Project Foundation

### Tasks

1. Ensure App Router structure
2. Configure Tailwind with a global theme
3. Create shared constants
4. Configure TanStack Query

### Files to create

- `lib/queryClient.ts`
- `lib/constants.ts`
- `app/layout.tsx` (wrap with QueryClientProvider)

---

## Step 2: WorkOS Setup

### Tasks

1. Install and configure WorkOS SDK
2. Create WorkOS client helper
3. Add environment variable template

### Files to create

- `lib/workos.ts`
- `.env.example`

### Required env vars

- WORKOS_API_KEY=
- NEXT_PUBLIC_WORKOS_CLIENT_ID=
- WORKOS_REDIRECT_URI=
- MONGODB_URI=

---

## Step 3: MongoDB Connection

### Tasks

1. Create MongoDB connection helper
2. Ensure connection reuse in serverless environment

### Files to create

- `lib/db.ts`

---

## Step 4: User Model & Role System

### Tasks

1. Create Mongoose User model
2. Persist WorkOS user ID
3. Default role = USER
4. Prepare for ADMIN role support

### Files to create

- `models/User.ts`

### User fields

- workosUserId
- email
- name
- role (USER | ADMIN)
- createdAt

---

## Step 5: Auth Service Layer (SOLID)

### Tasks

Create an authentication service responsible for:

- Finding user by WorkOS ID
- Creating user if not exists
- Returning user + role

### Rules

- No UI logic
- No direct WorkOS calls outside service

### Files to create

- `services/auth.service.ts`

---

## Step 6: Authentication Routes (App Router)

### Routes to implement

1. `/auth/login`
   - Redirect to WorkOS AuthKit
2. `/auth/callback`
   - Handle WorkOS response
   - Persist user
   - Establish session
3. `/auth/logout`
   - Destroy session

### Rules

- Minimal logic in routes
- Delegate logic to services

---

## Step 7: Session Handling & Middleware

### Tasks

1. Implement session validation helper
2. Protect authenticated routes
3. Restrict admin routes

### Files to create

- `lib/auth.ts`
- `middleware.ts`

### Route rules

- Public:
  - `/`
  - `/auth/*`
- Authenticated:
  - `/dashboard`
- Admin only:
  - `/admin/*`

---

## Step 8: Reusable Client Hooks

### Hooks to create

- `useAuth()` → returns user session
- `useRole()` → role-based checks

### Rules

- Use TanStack Query
- No direct fetch calls
- Small, single-purpose hooks

### Files to create

- `hooks/useAuth.ts`
- `hooks/useRole.ts`

---

## Step 9: UI Components (Minimal Set)

### Components to create under `/ui`

- Button (variants, loading, disabled)
- Card
- Loader

### Rules

- Accessible
- Theme-aware
- No business logic

---

## Step 10: Auth Pages

### Pages

1. Login page
2. Dashboard placeholder page (authenticated only)

### Rules

- Pages orchestrate only
- Use hooks and UI components
- No embedded business logic

---

## Step 11: Validation Checklist

Ensure:

- No component exceeds 180 lines
- SOLID and DRY compliance
- Roles enforced via middleware and hooks
- TanStack Query used for session caching
- Code matches cursorrules.md exactly

---

## Stop Condition

When Feature 1 is complete:

- Stop immediately
- Do NOT implement Feature 2
- Do NOT scaffold future features

---

### End of Feature 1 Prompt
