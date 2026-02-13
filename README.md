# RepMate

RepMate is a fitness coaching web application that includes:
- A **React + Vite frontend** (`frontend/`) for user flows like signup/login, profile, goals, plans, workout tracking, and contact.
- A **Node.js + Express backend** (`backend/`) with Prisma + PostgreSQL for authentication and persisted fitness data.
- A **legacy static implementation** (`legacy/`) retained as historical source/UI reference.

---

## Repository Structure

- `frontend/` — current React app (Vite, TailwindCSS, React Router).
- `backend/` — REST API (Express, Prisma, PostgreSQL, JWT auth + refresh token cookies).
- `legacy/` — old HTML/CSS/JS implementation based on local files and localStorage.

---

## Current Deployment Readiness Assessment

## Verdict: **Not fully deployment-ready yet**

The repository has a deployable backend and buildable frontend, but there are production blockers that should be addressed before a real release.

### What is already in good shape

- Backend has a health endpoint and modular route structure (`/health`, `/auth`, `/users`, `/profile`, `/goals`, `/plan`, `/progress`, `/messages`).
- Prisma schema is present and `prisma generate` works.
- Frontend production build works with Vite.
- Backend has security middleware basics (`helmet`, `cors`, `cookie-parser`) and structured error middleware.

### Blockers / Gaps to fix before production

1. **Frontend is not integrated with backend APIs**
   - Current frontend auth and data flows use browser `localStorage` and migration helpers rather than API calls.
   - As-is, deployment gives two separate systems (frontend local state + backend database API) instead of one integrated product.

2. **Frontend lint fails**
   - `npm run lint` reports multiple errors (unused variables + react-refresh export warning).
   - CI/CD should block merges on lint/test failures.

3. **Security hardening still incomplete**
   - No rate limiting, no brute-force protection on auth endpoints, no CSRF strategy beyond sameSite cookie defaults.
   - JWT secret management and cookie security policies need production verification (`secure`, domain, TTL, rotation policy).

4. **Missing production operational setup**
   - No containerization or IaC manifests in repo (no Dockerfile, Compose, Helm, Terraform, etc.).
   - No CI pipeline, no deployment workflow, no staging/prod environment strategy documented.
   - No monitoring/alerting/log aggregation guidance included.

5. **No automated test suite**
   - No backend unit/integration tests and no frontend component/e2e tests currently committed.

6. **Asset optimization concerns**
   - Several frontend image assets are very large and can slow initial page loads in production.

---

## Recommended Tasks (Priority Order)

### P0 (Release blockers)

1. **Integrate frontend with backend APIs**
   - Replace localStorage-only auth/profile/goals/plan/progress/messages logic with API client calls.
   - Persist and refresh tokens using backend contract (`/auth/login`, `/auth/refresh`, `/auth/me`, etc.).

2. **Fix lint errors and enforce CI gates**
   - Resolve existing ESLint failures.
   - Add CI checks for lint + build at minimum.

3. **Create environment templates and deployment docs**
   - Provide `backend/.env.example` and `frontend/.env.example`.
   - Document all required environment variables and safe defaults.

4. **Add baseline testing**
   - Backend: route-level tests for auth + protected endpoints.
   - Frontend: smoke tests for route rendering and auth guards.

### P1 (Production hardening)

5. **Add auth/API hardening**
   - Rate limiting and login attempt throttling.
   - Input validation consistency and response sanitization.
   - Evaluate CSRF strategy for cookie-based refresh endpoints.

6. **Introduce deployment assets**
   - Add Dockerfiles and optional docker-compose for local parity.
   - Add a cloud deployment guide (e.g., Vercel/Netlify for frontend + Render/Fly/AWS for backend + managed Postgres).

7. **Add observability**
   - Structured logging, error tracking (e.g., Sentry), uptime checks, and database metrics.

### P2 (Optimization)

8. **Optimize frontend static assets**
   - Compress/resize heavy images, convert where possible to modern formats.
   - Lazy-load non-critical assets/components.

9. **Deprecation plan for `legacy/`**
   - Keep for reference or archive/remove from production artifact paths.

---

## Local Development Setup

## 1) Backend

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Backend default URL: `http://localhost:4000`

### Backend environment variables

Create `backend/.env` (example values):

```env
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/repmate?schema=public
JWT_ACCESS_SECRET=change_me_access
JWT_REFRESH_SECRET=change_me_refresh
JWT_ACCESS_TTL_MIN=15
JWT_REFRESH_TTL_DAYS=30
CORS_ORIGIN=http://localhost:5173
```

## 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

---

## Build & Verification Commands

### Backend

```bash
cd backend
npm run prisma:generate
npm run start
```

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

---

## API Overview (Backend)

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`

### User and Fitness Data
- `GET /users/me`, `PUT /users/me`
- `GET /profile/me`, `PUT /profile/me`
- `GET /goals`, `PUT /goals`
- `GET /plan`, `PUT /plan`
- `GET /progress`, `PUT /progress`
- `POST /messages`, `GET /messages`

### Health
- `GET /health`

---

## Suggested Production Architecture

- **Frontend**: Vite build served by CDN/static hosting.
- **Backend**: Node.js service behind HTTPS reverse proxy.
- **Database**: Managed PostgreSQL (with migrations run in deploy pipeline).
- **Secrets**: Managed secret store (not git-tracked `.env`).
- **CI/CD**: lint + tests + build + migration + deploy per environment.
- **Monitoring**: logs, metrics, error tracking, uptime checks.

---

## Notes

- `legacy/` is a historical code path and should not be treated as the production app unless explicitly revived.
- The frontend and backend should be unified through API integration before launch.
