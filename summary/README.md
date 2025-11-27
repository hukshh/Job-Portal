# Job Portal Overview

## Project map
- `src/App.jsx` – page layout plus wiring between search, job list, saved jobs, and the application form.
- `src/components/*` – small, reusable UI blocks (header, search panel, cards, application form, saved panel) with matching CSS modules.
- `src/data/jobs.js` – mock openings that cover full-time, contract, and internship roles.
- `src/hooks/useJobPortal.js` – state logic for searching, filtering, saving jobs, and handling the apply flow.
- `src/constants/jobFilters.js` – filter chips shown inside the search panel.

## How it works
1. `useJobPortal` receives the mock jobs and returns derived data: filtered jobs, saved selections, and helpers for search text, filter chips, and the application drawer.
2. `SearchPanel` updates the hook state, so the job list rerenders instantly on every keystroke or filter change.
3. `JobList` renders `JobCard` entries; clicking **Apply** opens `ApplicationPanel`, while **Save** toggles the role in `SavedJobsPanel`.
4. The form validates only name/email (to keep things simple) and then prints a confirmation message—no network calls or storage.

## Run it
```bash
npm install
npm run dev
```
Visit the printed URL (default: `http://localhost:5173`) to explore the portal. Use `npm run build` for a production bundle.



