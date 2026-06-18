Octofit Tracker — Backend

This backend is a Node.js + Express API (TypeScript) using Mongoose for MongoDB.

This update configures the API for Codespaces and local development:
- Default backend port is 8000 (PORT=8000)
- When running inside Codespaces, the API base URL is:
  https://$CODESPACE_NAME-8000.app.github.dev
  (computed automatically by the backend using the CODESPACE_NAME environment variable)
- When CODESPACE_NAME is not set, the API base URL falls back to:
  http://localhost:8000

Quick start
1. cd octofit-tracker/backend
2. npm install
3. copy .env.example to .env and adjust values if needed
   cp .env.example .env
4. Ensure MongoDB is running (local or Docker)
   docker run -d -p 27017:27017 --name octofit-mongo -v octofit-mongo-data:/data/db mongo:6
5. Seed example data (optional but helpful):
   npm run seed
6. Start the dev server:
   npm run dev

The server will print the API base URL at startup. In Codespaces you should see a URL like:
  API base URL: https://<your-codespace-name>-8000.app.github.dev

Verify endpoints with curl

- From Codespaces (recommended):
  # Replace $CODESPACE_NAME with the Codespace environment variable value
  curl -sS "https://$CODESPACE_NAME-8000.app.github.dev/api/users" | jq
  curl -sS "https://$CODESPACE_NAME-8000.app.github.dev/api/activities" | jq

- From your local machine (when running the server locally):
  curl -sS http://localhost:8000/api/users | jq
  curl -sS http://localhost:8000/api/activities | jq

Expected responses
- GET /api/users
  Returns a JSON array of user objects, e.g.:
  [
    {
      "_id": "...",
      "name": "Alice Runner",
      "email": "alice@example.com",
      // other fields
    }
  ]

- GET /api/activities
  Returns a JSON array of activity objects, e.g.:
  [
    {
      "_id": "...",
      "name": "Running",
      "description": "Outdoor running",
      "unit": "meters"
    }
  ]

If you see connection errors, check:
- MONGO_* values in .env (or MONGO_URL)
- That MongoDB is reachable (docker ps or Atlas)
- That PORT 8000 is available in your environment

If you want, I can also:
- Add a devcontainer.json for Codespaces that exposes port 8000 automatically
- Add a GitHub Codespaces prebuild or dotfiles to set CODESPACE_NAME
- Add health checks and a readiness endpoint for Kubernetes
