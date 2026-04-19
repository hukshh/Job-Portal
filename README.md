# Job Portal

A modern, fully client-side job search and application platform built with **React 19 + Vite**.

## Features

- **Browse & search** job listings by role, company, location, or tag
- **Filter** by job type (Full-time, Part-time, Contract, Internship, Remote)
- **Sort** by newest, oldest, or salary
- **Save jobs** — persisted in localStorage across sessions
- **Quick apply** with name, email, phone, and a short note
- **Job detail modal** — full listing info before applying
- **User authentication** with localStorage persistence
- **Profile management** — name, headline, bio, location, phone
- **Resume panel** — store and manage your resume details
- **Pagination** — 6 jobs per page with page controls
- **Responsive** — works on mobile, tablet, and desktop
- **Toast notifications** for feedback
- **Back to top** button on long pages

## Component Library

Reusable components built during development:
`Badge` · `Button` · `Card` · `Chip` · `Avatar` · `CompanyLogo`
`Spinner` · `Toast` · `Modal` · `Tooltip` · `Divider` · `ProgressBar`
`EmptyState` · `SkeletonCard` · `StatCard` · `PageHeader` · `Pagination`

## Hooks

`useJobPortal` · `useLocalStorage` · `useDebounce` · `useSortJobs`
`usePagination` · `useForm` · `useToast` · `useWindowSize`

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` — create an account (any email + 6+ char password) and start exploring.

## Tech Stack

- React 19
- Vite 7
- Plain CSS with CSS custom properties
- localStorage for persistence (no backend required)

## Project Structure

```
src/
├── components/     # UI components
├── context/        # React context (Auth)
├── data/           # Static job data
├── hooks/          # Custom hooks
├── utils/          # Helpers (formatters, validators, storage, etc.)
├── App.jsx
└── main.jsx
```
