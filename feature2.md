# Feature 2 — Admin Dashboard (Categories, Subcategories, User Management)

## Objective

Implement the **Admin Dashboard** that allows ADMIN users to:

- Manage categories
- Manage subcategories
- Manage users and roles

This feature must be:

- Enterprise-grade
- Secure
- Fully typed
- SOLID & DRY compliant
- Strictly aligned with cursorrules.md

Do NOT implement course, chapter, lesson, quiz, or student-facing features.

---

## Scope (STRICT)

### Included

- Admin route protection
- Admin layout
- Category CRUD
- Subcategory CRUD
- User listing
- User role management (USER / ADMIN)
- Status management (ACTIVE / INACTIVE)
- Pagination-ready APIs
- Reusable UI components
- TanStack Query integration

### Excluded

- Courses
- Chapters
- Lessons
- Quizzes
- Gamification
- Animations
- Leaderboard
- Emails
- PWA

---

## Global Constraints (MANDATORY)

- TypeScript strict mode
- No component > 180 lines
- Pages orchestrate only
- No raw HTML buttons
- UI components must come from `/ui`
- No duplicated logic
- No hardcoded colors
- No `any`
- No TODOs
- No future feature scaffolding

---

## Step 1: Admin Route Protection & Layout

### Tasks

1. Protect all `/admin/*` routes using middleware
2. Enforce ADMIN role only
3. Create a shared admin layout

### Files to create

- `app/(admin)/layout.tsx`
- Reuse existing middleware & role hooks

### Rules

- No UI logic in middleware
- Role enforcement must be centralized

---

## Step 2: Category & Subcategory Models

### Tasks

Create MongoDB models for categories and subcategories.

### Files to create

- `models/Category.ts`
- `models/SubCategory.ts`

### Category fields

- name
- slug
- status (ACTIVE | INACTIVE)
- createdAt

### SubCategory fields

- name
- slug
- categoryId
- status (ACTIVE | INACTIVE)
- createdAt

### Rules

- One model per file
- Explicit indexes on slug
- No business logic in models

---

## Step 3: Admin Services Layer (SOLID)

### Tasks

Create service classes responsible for:

- Category CRUD
- Subcategory CRUD
- User management

### Files to create

- `services/category.service.ts`
- `services/subcategory.service.ts`
- `services/user.service.ts`

### Rules

- Services contain all business logic
- No database access outside services
- No UI or HTTP logic inside services

---

## Step 4: Admin API Routes / Server Actions

### Tasks

Expose server actions or API routes for:

- Create / update / delete category
- Create / update / delete subcategory
- Fetch paginated categories
- Fetch paginated users
- Update user role
- Activate / deactivate users

### Rules

- Validate inputs
- Return typed responses
- Delegate logic to services
- No duplicated logic

---

## Step 5: Admin Data Hooks (TanStack Query)

### Hooks to create

- `useCategories()`
- `useSubCategories(categoryId)`
- `useUsers()`
- `useUpdateUserRole()`

### Rules

- Hooks must wrap TanStack Query
- No fetch calls inside components
- Mutations must invalidate correct queries

### Files

- Place hooks inside relevant feature folders

---

## Step 6: Admin UI Components (Reusable)

### UI Components to create (if missing)

- Table
- StatusBadge
- ConfirmModal
- PaginationControls

### Rules

- Place under `/ui`
- Theme-aware
- Accessible
- No business logic

---

## Step 7: Admin Pages (Composition Only)

### Pages to implement

1. Category Management Page
2. Subcategory Management Page
3. User Management Page

### Rules

- Pages orchestrate only
- Split into:
  - page shell
  - table component
  - modal components
- No component > 180 lines

---

## Step 8: User Management Rules

### Capabilities

- View users
- Change role (USER ↔ ADMIN)
- Activate / deactivate users

### Rules

- Cannot remove own ADMIN role
- Role changes must be audited-ready
- UI must confirm destructive actions

---

## Step 9: Validation Checklist

Ensure:

- Admin routes blocked for USER role
- All admin data fetched via TanStack Query
- All UI uses `/ui` components
- No business logic in components
- No component exceeds 180 lines
- SOLID & DRY compliance

---

## Stop Condition

When Feature 2 is complete:

- Stop immediately
- Do NOT implement Feature 3
- Do NOT scaffold future features

---

### End of Feature 2 Prompt
