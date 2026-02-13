# RepMate Backend (Node.js + Express + PostgreSQL)

## Setup
1. Create a PostgreSQL database.
2. Copy `.env.example` to `.env` and set values.
3. Install dependencies:
   - `npm install`
4. Generate Prisma client:
   - `npm run prisma:generate`
5. Create DB tables:
   - `npm run prisma:migrate`
6. Start the server:
   - `npm run dev`

## Environment
- `DATABASE_URL` must be a valid PostgreSQL connection string.
- `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` must be strong random strings.
- `CORS_ORIGIN` should be your frontend URL.

## API Endpoints
Auth:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`

Users:
- `GET /users/me`
- `PUT /users/me`

Profile:
- `GET /profile/me`
- `PUT /profile/me`

Goals:
- `GET /goals`
- `PUT /goals`

Plan:
- `GET /plan`
- `PUT /plan`

Progress:
- `GET /progress`
- `PUT /progress`

Messages:
- `POST /messages`
- `GET /messages`

## AWS Notes
- Use RDS for PostgreSQL.
- Set `DATABASE_URL` to your RDS connection string.
- Set `CORS_ORIGIN` to your production frontend URL.
