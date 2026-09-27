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

Features

View all projects and their current delivery status

Display project deadlines

Automatically highlight overdue projects

Mark projects as In Progress or Completed

Add tracking notes to project updates

Maintain a workflow activity/history log

Display the 10 most recent workflow entries

Refresh project status and activity history after an update

Input validation using Zod

Centralized error and 404 handling

Responsive UI for desktop and mobile

Separate frontend and backend deployment

SQLite database for simple local and hosted persistence

Tech Stack

Frontend

React

Vite

JavaScript

CSS

Fetch API

Backend

Node.js

Express.js

SQLite

better-sqlite3

Zod

CORS

dotenv

Deployment

Frontend: Vercel

Backend: Render

Database: SQLite

Project Structure

project-deadline-tracker/
│
├── backend/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── projectController.js
│   │   └── logController.js
│   │
│   ├── middleware/
│   │   ├── errorMiddleware.js
│   │   ├── notFoundMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── models/
│   │   ├── projectModel.js
│   │   └── logModel.js
│   │
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   └── logRoutes.js
│   │
│   ├── validators/
│   │   └── projectValidator.js
│   │
│   ├── seed/
│   │   └── seed.js
│   │
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
│   │   │
│   │   ├── hooks/
│   │   │   └── useProjects.js
│   │   │
│   │   ├── services/
│   │   │   └── projectService.js
│   │   │
│   │   ├── utils/
│   │   │   └── dateUtils.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── ...
│
└── .gitignore

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

The frontend communicates with the Express backend through REST API
endpoints.

The backend handles:

Request routing

Request validation

Business logic

Database operations

Error handling

Activity log creation

The frontend handles:

UI rendering

User interaction

API communication

Loading/error/success states

Overdue project highlighting

Form handling

Backend Architecture

The backend follows an MVC-style structure.

Request
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
Controller
   │
   ▼
Model
   │
   ▼
SQLite Database

Routes

Routes define the API endpoints and connect them to controllers.

GET  /api/projects
POST /api/project-update
GET  /api/logs

Controllers

Controllers contain the application logic for each request.

For example, when a project is updated:

POST /api/project-update
        │
        ▼
Validate request with Zod
        │
        ▼
Find project
        │
        ▼
Update project status
        │
        ▼
Create activity log
        │
        ▼
Return updated project

Models

Models contain database operations.

projectModel.js handles:

Fetching all projects

Finding a project by ID

Updating project status

logModel.js handles:

Creating activity logs

Fetching the latest 10 logs

Middleware

The backend uses middleware for:

Request body parsing

CORS

Zod request validation

Unknown route handling

Centralized error handling

Database

SQLite is used as the database because the application has a small data
model and does not require a separate database server.

Projects Table

projects
├── id
├── project_name
├── deadline_date
├── status
└── updated_at

Logs Table

logs
├── id
├── project_id
├── project_name
├── status
├── notes
└── updated_at

The logs.project_id column references the project that generated the
activity.

API Endpoints

Get Projects

GET /api/projects

Returns all projects ordered by deadline.

Example

[
  {
    "id": 1,
    "project_name": "Website Redesign",
    "deadline_date": "2026-09-25",
    "status": "In Progress",
    "updated_at": "2026-09-27 14:30:00"
  }
]

Update Project

POST /api/project-update

Updates a project's status and creates a corresponding workflow log.

Request Body

{
  "project_id": 1,
  "status": "Completed",
  "notes": "Final delivery completed successfully."
}

Supported Statuses

In Progress
Completed

Get Logs

GET /api/logs

Returns the 10 most recent workflow entries.

Frontend Architecture

The frontend is divided into reusable components rather than placing the
entire UI inside App.jsx.

App
│
├── Header
│
├── Alert
│
├── ProjectDashboard
│
├── ProjectUpdateForm
│
└── HistoryFeed

Supporting logic is separated into:

hooks/

useProjects.js

Responsible for:

Loading projects

Loading logs

Saving project updates

Loading states

Error states

Success states

services/

projectService.js

Responsible for communicating with the backend API.

This keeps API calls separate from UI components.

utils/

dateUtils.js

Responsible for:

Date formatting

Determining the current date

Detecting overdue projects

Overdue Project Logic

A project is considered overdue when:

status != Completed
AND
deadline_date < today's date

Overdue projects are highlighted in red on the dashboard.

A project with today's deadline is not considered overdue.

A completed project is never marked overdue, even if its deadline
has passed.

Local Installation

Requirements

Make sure the following are installed:

Node.js

npm

Git

1. Clone the Repository

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd project-deadline-tracker

Backend Setup

Open a terminal inside the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file:

PORT=5000
NODE_ENV=development

Start the backend in development mode:

npm run dev

Or start it normally:

npm start

The backend will run at:

http://localhost:5000

Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Create a .env file:

VITE_API_URL=http://localhost:5000

Start the frontend:

npm run dev

Vite will provide a local URL, usually:

http://localhost:5173

Open that URL in your browser.

Seeding the Database

The project includes a seed script for adding sample projects.

From the backend directory:

node seed/seed.js

The database file is:

backend/database.db

The database and tables are automatically created when the backend
starts.

Important

The seed script inserts records. Running it multiple times can create
duplicate projects.

If a clean database is required during local development:

Stop the backend.

Delete backend/database.db.

Start the backend once.

Run the seed script once.

Environment Variables

Backend

backend/.env

PORT=5000
NODE_ENV=development

The production server on Render provides its own PORT.

Frontend

frontend/.env

VITE_API_URL=http://localhost:5000

For production, this value is changed to the deployed Render backend
URL.

Example:

VITE_API_URL=https://your-backend.onrender.com

.env files are excluded from Git using .gitignore.

Production Deployment

The application is split into two deployments.

GitHub Repository
       │
       ├──────────────► Render
       │                 │
       │                 └── Express API
       │
       └──────────────► Vercel
                         │
                         └── React Frontend

Backend --- Render

The backend is deployed as a Render Web Service.

Render Configuration

Root Directory

backend

Build Command

npm install

Start Command

npm start

Environment Variables

Add:

NODE_ENV=production

Render automatically provides the PORT environment variable.

The deployed backend will have a URL similar to:

https://your-backend-name.onrender.com

Frontend --- Vercel

The React/Vite frontend is deployed to Vercel.

Vercel Configuration

Root Directory

frontend

Vercel automatically detects the Vite project.

Set the following environment variable:

VITE_API_URL=https://your-backend-name.onrender.com

After deployment, Vercel provides the public frontend URL.

Frontend URL

____________________________________________

Production Request Flow

When an evaluator opens the Vercel URL:

Browser
   │
   │ GET /api/projects
   ▼
Vercel React App
   │
   │ HTTP Request
   ▼
Render Express API
   │
   │ SQL Query
   ▼
SQLite database
   │
   │ JSON Response
   ▼
Render API
   │
   ▼
React Dashboard

When the evaluator submits an update:

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
     └── Create Log
     │
     ▼
SQLite
     │
     ▼
Updated Project Response
     │
     ▼
Frontend Refreshes
     ├── Project Dashboard
     └── History Feed

Error Handling

The backend uses centralized error handling.

Invalid Route

Returns:

{
  "message": "Route /api/example not found"
}

Invalid Request

Zod validates the project update payload before it reaches the
controller.

Example validation errors are returned with the affected field and
message.

Server Error

Unexpected backend errors are handled by the centralized error
middleware.

Why These Technologies?

React

Used to create a component-based and responsive dashboard UI.

Express

Provides a lightweight REST API and clean routing structure.

SQLite

Suitable for the small relational dataset required by the assignment
without requiring a separate database server.

better-sqlite3

Provides synchronous and simple SQLite database access for the Node.js
backend.

Zod

Provides schema-based validation for incoming API data.

Vite

Provides a fast development environment and production build system for
the React application.

Vercel

Used to host the frontend and provide a public URL for the dashboard.

Render

Used to host the Node.js/Express backend API.

Development Principles

The application intentionally avoids unnecessary complexity.

There is no authentication, authorization, global state library, ORM, or
external database service because these are not required for the
application's scope.

The code is separated into clear responsibilities:

UI
│
├── Components
│
├── Custom Hook
│
├── API Service
│
└── Utility Functions

Backend
│
├── Routes
├── Middleware
├── Controllers
├── Models
└── Database

This keeps the application easy to understand, test, modify, and deploy.

Author

Ratnojit Saha
11900122167
B.Tech Computer Science & Engineering, 2026 passout
Siliguri Institute of Technology