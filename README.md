# Kalvi - Enterprise-Grade E-Learning Platform

A gamified e-learning platform built with Next.js, WorkOS authentication, and MongoDB.

## Features

- **Authentication**: WorkOS AuthKit integration
- **Role-Based Access Control**: USER and ADMIN roles
- **Database**: MongoDB with Mongoose
- **State Management**: TanStack Query for server state
- **Styling**: Tailwind CSS with custom theme

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- MongoDB database
- WorkOS account with API keys

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required environment variables:

- `NEXT_PUBLIC_WORKOS_CLIENT_ID` - Your WorkOS Client ID (must be prefixed with `NEXT_PUBLIC_` for client-side access)
- `WORKOS_API_KEY` - Your WorkOS API key (for server-side operations)
- `MONGODB_URI` - MongoDB connection string
- `NEXTAUTH_SECRET` - Secret for session encryption (optional, for future use)

**Note:**

- The authentication flow uses WorkOS AuthKit React (client-only integration)
- Configure your redirect URI in the WorkOS Dashboard under "Redirects" section
- Set your sign-in endpoint to `/auth/login` in the WorkOS Dashboard
- Add your domain to the CORS allowlist in WorkOS Dashboard (e.g., `http://localhost:8000` for development)
- For development, `devMode={true}` is automatically set, which stores the refresh token in local storage

3. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router pages and routes
├── hooks/           # React hooks (useAuth, useRole)
├── lib/             # Utilities and configurations
├── models/          # Mongoose models
├── services/        # Business logic services
├── types/           # TypeScript type definitions
└── ui/              # Reusable UI components
```

## Authentication Flow

1. User visits `/auth/login` → Sees sign in/sign up options
2. User clicks "Sign In" or "Sign Up" → Redirects to WorkOS AuthKit hosted UI
3. WorkOS authenticates user → Redirects back to your app
4. AuthKit provider handles the session → Syncs user with MongoDB via `/api/auth/sync`
5. User is redirected to `/dashboard`

## Route Protection

- **Public routes**: `/`, `/auth/*`
- **Authenticated routes**: `/dashboard` (requires valid session)
- **Admin routes**: `/admin/*` (requires ADMIN role)

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State**: TanStack Query
- **Authentication**: WorkOS AuthKit
- **Database**: MongoDB (Mongoose)
