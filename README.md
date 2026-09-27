Project Deadline Tracker

A full-stack project management dashboard for tracking project
deadlines, delivery status, workflow updates, and recent activity
history.

The application is built with React on the frontend and Node.js +
Express + SQLite on the backend. It is structured using a
component-based frontend and an MVC-style backend architecture.

Live Application
Note : If you want to test APIs from postman directly without installing or visiting the hosted frontend. Please check with the hosted backend url directly. 

Frontend:
____________________________________________

Backend:
____________________________________________

Backend API: Hosted on Render

## Features

- View all projects and their current delivery status
- Display project deadlines
- Automatically highlight overdue projects
- Update project status between `In Progress` and `Completed`
- Add tracking notes to project updates
- Maintain a workflow activity/history log
- Display the 10 most recent workflow entries
- Automatically refresh project data and history after updates
- Validate API requests using Zod
- Centralized 404 and error handling
- Responsive UI for desktop and mobile
- Separate frontend and backend deployment
- SQLite database for project and activity data

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | UI development |
| Vite | Frontend development and build tooling |
| JavaScript | Application logic |
| CSS | Styling and responsive design |
| Fetch API | Backend API communication |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API and routing |
| SQLite | Relational database |
| better-sqlite3 | SQLite database driver |
| Zod | Request validation |
| CORS | Cross-origin API access |
| dotenv | Environment variable management |

### Deployment

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | SQLite |

# Project Structure

```text
project-deadline-tracker/
│
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── projectController.js
│   │   └── logController.js
│   ├── middleware/
│   │   ├── errorMiddleware.js
│   │   ├── notFoundMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── projectModel.js
│   │   └── logModel.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   └── logRoutes.js
│   ├── validators/
│   │   └── projectValidator.js
│   ├── seed/
│   │   └── seed.js
│   ├── database.db
│   ├── .env
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ProjectDashboard.jsx
│   │   │   ├── ProjectUpdateForm.jsx
│   │   │   ├── HistoryFeed.jsx
│   │   │   └── Alert.jsx
│   │   ├── hooks/
│   │   │   └── useProjects.js
│   │   ├── services/
│   │   │   └── projectService.js
│   │   ├── utils/
│   │   │   └── dateUtils.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

Overall Architecture

The application follows a simple client-server architecture.

                    ┌──────────────────────┐
                    │       Vercel         │
                    │   React Frontend     │
                    └──────────┬───────────┘
                               │
                         HTTP / JSON
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Render         │
                    │ Node.js + Express    │
                    │      REST API        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       SQLite         │
                    │    database.db       │
                    └──────────────────────┘

### The frontend communicates with the Express backend through REST API endpoints.


### Backend Responsibilities

- Request routing
- Request validation
- Business logic
- Database operations
- Error handling
- Activity log creation

### Frontend Responsibilities

- UI rendering
- User interaction
- API communication
- Loading, error, and success states
- Overdue project highlighting
- Form handling

---

# Backend Architecture

The backend follows an MVC-style architecture.

```text
Client Request
      │
      ▼
   Routes
      │
      ▼
 Middleware
      │
      ├── Validation
      │
      ▼
 Controllers
      │
      ▼
    Models
      │
      ▼
 SQLite Database
```

## Routes

Routes define the API endpoints and connect requests to controllers.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/projects` | Get all projects |
| POST | `/api/project-update` | Update a project and create a log |
| GET | `/api/logs` | Get the latest 10 workflow logs |

---

## Controllers

Controllers contain the application logic for each request.

For example, when a project is updated:

```text
POST /api/project-update
          │
          ▼
   Validate with Zod
          │
          ▼
    Find the project
          │
          ▼
  Update project status
          │
          ▼
    Create activity log
          │
          ▼
   Return updated project
```

---

## Models

Models handle database operations.

### `projectModel.js`

Responsible for:

- Fetching all projects
- Finding a project by ID
- Updating project status

### `logModel.js`

Responsible for:

- Creating activity logs
- Fetching the latest 10 logs

---

## Middleware

The backend uses middleware for:

- JSON request body parsing
- CORS
- Zod request validation
- Unknown route handling
- Centralized error handling

---

# Database

SQLite is used because the application has a small relational data model and does not require a separate database server.

## Projects Table

```text
projects
├── id
├── project_name
├── deadline_date
├── status
└── updated_at
```

## Logs Table

```text
logs
├── id
├── project_id
├── project_name
├── status
├── notes
└── updated_at
```

The `logs.project_id` column references the project that generated the activity.

---

# API Endpoints

## 1. Get Projects

```http
GET /api/projects
```

Returns all projects ordered by deadline.

### Example Response

```json
[
  {
    "id": 1,
    "project_name": "Website Redesign",
    "deadline_date": "2026-09-25",
    "status": "In Progress",
    "updated_at": "2026-09-27 14:30:00"
  }
]
```

---

## 2. Update Project

```http
POST /api/project-update
```

Updates a project's status and creates a corresponding workflow log.

### Request Body

```json
{
  "project_id": 1,
  "status": "Completed",
  "notes": "Final delivery completed successfully."
}
```

### Supported Statuses

```text
In Progress
Completed
```

---

## 3. Get Logs

```http
GET /api/logs
```

Returns the 10 most recent workflow entries.

---

# Frontend Architecture

The frontend is divided into reusable components instead of placing the entire UI inside `App.jsx`.

```text
App
│
├── Header
├── Alert
├── ProjectDashboard
├── ProjectUpdateForm
└── HistoryFeed
```

Supporting application logic is separated into custom hooks, services, and utility functions.

## Custom Hook

### `hooks/useProjects.js`

Responsible for:

- Loading projects
- Loading logs
- Saving project updates
- Managing loading states
- Managing error states
- Managing success states

---

## API Services

### `services/projectService.js`

Responsible for communicating with the backend API.

This keeps API requests separate from UI components.

---

## Utility Functions

### `utils/dateUtils.js`

Responsible for:

- Date formatting
- Determining the current date
- Detecting overdue projects

---

# Overdue Project Logic

A project is considered overdue when both conditions are true:

```text
status != "Completed"
AND
deadline_date < today's date
```

Overdue projects are highlighted in red on the dashboard.

A project with today's deadline is **not** considered overdue.

A completed project is **never** marked overdue, even if its deadline has passed.

---

# Local Installation

## Requirements

Make sure the following are installed:

- Node.js
- npm
- Git

---

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd project-deadline-tracker
```

---

# Backend Setup

Open a terminal inside the `backend` directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
NODE_ENV=development
```

Start the backend in development mode:

```bash
npm run dev
```

Or start it normally:

```bash
npm start
```

The backend will run at:

```text
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Vite will provide a local URL, usually:

```text
http://localhost:5173
```

Open the URL provided by Vite in your browser.

---

# Seeding the Database

The project includes a seed script for adding sample projects.

From the `backend` directory:

```bash
node seed/seed.js
```

The database file is:

```text
backend/database.db
```

The database tables are automatically created when the backend starts.

> **Important:** The seed script inserts records. Running it multiple times can create duplicate projects.

If a clean database is required during local development:

1. Stop the backend.
2. Delete `backend/database.db`.
3. Start the backend once.
4. Run the seed script once.

---

# Environment Variables

## Backend

File:

```text
backend/.env
```

```env
PORT=5000
NODE_ENV=development
```

The production server on Render provides its own `PORT` environment variable.

---

## Frontend

File:

```text
frontend/.env
```

```env
VITE_API_URL=http://localhost:5000
```

For production, this value should point to the deployed Render backend.

Example:

```env
VITE_API_URL=https://your-backend.onrender.com
```

`.env` files are excluded from Git using `.gitignore`.

---

# Production Deployment

The application is split into two deployments:

```text
                    GitHub Repository
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
           Render                    Vercel
              │                         │
              ▼                         ▼
       Express REST API           React Frontend
              │
              ▼
           SQLite
```

---

# Backend — Render

The backend is deployed as a **Render Web Service**.

### Render Configuration

| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |

### Environment Variables

Add:

```text
NODE_ENV=production
```

Render automatically provides the `PORT` environment variable.

The deployed backend will have a URL similar to:

```text
https://your-backend-name.onrender.com
```

---

# Frontend — Vercel

The React/Vite frontend is deployed to Vercel.

### Vercel Configuration

| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Framework | Vite |

Vercel automatically detects the Vite project.

### Environment Variable

Set:

```text
VITE_API_URL=https://your-backend-name.onrender.com
```

After deployment, Vercel provides the public frontend URL.

### Frontend URL

```text
____________________________________________
```

---

# Production Request Flow

When an evaluator opens the Vercel application:

```text
Browser
   │
   ▼
Vercel React Application
   │
   │  HTTP Request
   ▼
Render Express API
   │
   │  SQL Query
   ▼
SQLite Database
   │
   │  JSON Response
   ▼
Render API
   │
   ▼
React Dashboard
```

When an evaluator submits a project update:

```text
Update Form
     │
     ▼
POST /api/project-update
     │
     ▼
Zod Validation
     │
     ▼
Project Controller
     │
     ├── Update Project
     │
     └── Create Activity Log
     │
     ▼
SQLite Database
     │
     ▼
Updated Response
     │
     ▼
Frontend Refresh
     │
     ├── Project Dashboard
     │
     └── History Feed
```

---

# Error Handling

The backend uses centralized error handling.

## Invalid Route

Example:

```http
GET /api/example
```

Response:

```json
{
  "message": "Route /api/example not found"
}
```

## Invalid Request

Zod validates the project update payload before it reaches the controller.

Validation errors include the affected field and an explanatory message.

## Server Error

Unexpected backend errors are handled by the centralized error middleware.

---

# Why These Technologies?

| Technology | Reason |
|---|---|
| React | Component-based and responsive dashboard UI |
| Express | Lightweight REST API and routing |
| SQLite | Simple relational database suitable for the application's scope |
| better-sqlite3 | Simple SQLite access from Node.js |
| Zod | Schema-based API request validation |
| Vite | Fast frontend development and production builds |
| Vercel | Frontend hosting and public application URL |
| Render | Node.js/Express backend hosting |

---

# Development Principles

The application intentionally avoids unnecessary complexity.

There is no authentication, authorization, global state library, ORM, or external database service because these are not required for the application's scope.

The code is separated into clear responsibilities:

```text
Frontend
│
├── Components
├── Custom Hooks
├── API Services
└── Utility Functions

Backend
│
├── Routes
├── Middleware
├── Controllers
├── Models
└── Database
```

This keeps the application easy to understand, test, modify, and deploy.

---

# Author

**Ratnojit Saha**

B.Tech Computer Science & Engineering — 2026  
Siliguri Institute of Technology
