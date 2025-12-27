# Cursor Rules — Enterprise-Grade Gamified E-Learning Platform

## 1. Core Objective

Build an **enterprise-grade, gamified e-learning platform inspired by Duolingo**, developed **feature by feature**.

The application must be:
- Scalable
- Maintainable
- Testable
- Secure
- Consistent in UI/UX
- Production-ready from day one

---

## 2. Engineering Principles (MANDATORY)

### SOLID Principles
All code must follow:
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

No component, hook, service, or model may handle multiple responsibilities.

---

### DRY (Do Not Repeat Yourself)
- No duplicated logic
- No duplicated UI patterns
- Shared logic must be extracted into:
  - reusable hooks
  - services
  - shared UI components

---

## 3. Component Size Rule (NON-NEGOTIABLE)

- **No React component may exceed 180 lines**
- Pages must only orchestrate components
- Large pages must be split into:
  - layout components
  - section components
  - reusable UI components

If a component approaches 180 lines, it must be split immediately.

---

## 4. Tech Stack (STRICT)

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State & Caching**: TanStack Query, Jotai
- **Authentication**: WorkOS AuthKit
- **Database**: MongoDB (Mongoose)
- **Hosting**: Vercel
- **Images**: Vercel Blob or public assets


---

## 5. Architectural Rules

### Server–Client Separation
- Database access → server only
- Business logic → services
- UI → components only
- Pages → orchestration only

Avoid `"use client"` unless strictly required.

---

## 6. Folder Structure Standard
<pre>
src/
├── app/
│ ├── (public)/
│ ├── (auth)/
│ ├── (admin)/
│ ├── (student)/
│ └── api/
│
├── modules/
│ ├── auth/
│ ├── admin/
│ ├── course/
│ ├── chapter/
│ ├── lesson/
│ ├── quiz/
│ ├── progress/
│ └── leaderboard/
│
├── ui/
│ ├── button/
│ ├── input/
│ ├── modal/
│ ├── card/
│ ├── badge/
│ └── index.ts
│
├── hooks/
│ ├── useAuth.ts
│ ├── useRole.ts
│ ├── useDisclosure.ts
│ ├── usePagination.ts
│ └── useTheme.ts
│
├── services/
│ ├── auth.service.ts
│ ├── user.service.ts
│ ├── course.service.ts
│ └── quiz.service.ts
│
├── lib/
│ ├── db.ts
│ ├── workos.ts
│ ├── auth.ts
│ ├── queryClient.ts
│ └── constants.ts
│
├── models/
│ ├── User.ts
│ ├── Course.ts
│ ├── Chapter.ts
│ ├── Lesson.ts
│ ├── Quiz.ts
│ └── Progress.ts
│
└── types/
</pre>

---

## 7. UI System Rules (MANDATORY)

### UI Components
- All base UI elements must live under `/ui`
- Examples:
  - Button
  - Input
  - Modal
  - Card
  - Badge
  - Loader

Rules:
- No raw `<button>` like components in feature components
- Always import from `/ui`
- UI components must be:
  - reusable
  - accessible
  - theme-aware
- UI components must NOT contain business logic

---

## 8. Theme System (CONSISTENT)

- Define a single global theme
- Colors must be declared in:
  - `tailwind.config.ts`
  - `lib/constants.ts`

No hardcoded colors inside components.

---

## 9. Data Fetching & Caching (TanStack Query)

- All server data must use TanStack Query
- Queries must be wrapped in reusable hooks
- No `fetch` calls directly inside components

Rules:
- Unique query keys
- Mutations must invalidate relevant queries
- Queries must be colocated with features

---

## 10. Authentication & Authorization

- Authentication via WorkOS AuthKit
- Authorization via MongoDB roles

Roles:

- USER
- ADMIN


Rules:
- Route protection via middleware
- Role checks via reusable hooks
- No role logic inside UI components
- Create a hook to handle roles

---

## 11. Database Rules

- Use Mongoose
- One model per file
- Explicit indexes for:
  - progress
  - leaderboard
- No business logic inside models

---

## 12. Gamification Rules

- Lessons and quizzes are ordered nodes
- Quiz acts as a boss level
- Points are immutable after completion
- Progress cannot be overwritten
- Chapter completion awards medal or cup

Gamification logic must live in services.

---

## 13. Performance & Free-Tier Constraints

- Minimize DB round trips
- Use aggregation pipelines where needed
- Cache aggressively with TanStack Query
- Lazy-load animations
- Avoid unnecessary client components

---

## 14. Code Quality Rules

- Strict TypeScript only
- No `any`
- No commented-out code
- No TODOs
- Meaningful naming
- Clear separation of concerns

---

## 15. Feature Development Contract

For every feature:
1. Scope explanation
2. Required models/services/hooks
3. UI composition using `/ui`
4. TanStack Query integration
5. Route & role protection
6. Extensibility preserved

Never implement future features early.

---

## 16. Output Discipline

- Production-ready code only
- Fully typed
- Modular and reusable
- Enterprise-grade quality

---

## 17. Incremental Development Rule

Only implement the currently requested feature.
Stop immediately when the feature is complete.

---

### End of Cursor Rules
