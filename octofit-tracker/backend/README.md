Express logic tier added

This backend contains a minimal Express app wired to the existing MongoDB helper and User model.

Files added
- tsconfig.json - TypeScript config for backend
- src/index.ts - Express app, mounts routes and connects to MongoDB
- src/routes/users.ts - Express Router for user endpoints
- src/controllers/userController.ts - request handlers
- src/services/userService.ts - DB access logic using the User model
- .env.example - sample environment variables

Quick start
1. cd octofit-tracker/backend
2. npm install
3. copy .env.example to .env and adjust MONGO_URL if needed
4. npm run dev

Endpoints
- GET /health => { status: 'ok' }
- GET /api/users => list users (limit 50)
- POST /api/users => create user { name, email }

Next steps I can do for you
- Add validation (zod/joi) and request schemas
- Add pagination, filtering, and indexes for users
- Add Dockerfile + docker-compose with a MongoDB service
- Add tests (supertest + vitest/jest)
