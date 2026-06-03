# Task Management System

A full-stack web application for managing tasks collaboratively in real time.

## Team Members
| Member | Role | Responsibility |
|--------|------|----------------|
| Thanuri Mithara | Team Leader | Backend Auth, JWT, Project Management |
| Member 2 | Backend Dev | Task Management APIs |
| Member 3 | Frontend Dev | React UI, Dashboard |
| Member 4 | Database & Security | DB Design, Input Validation |
| Member 5 | DevOps | Docker, Deployment, WebSockets |

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Real-time:** Socket.io
- **Deployment:** Docker, Cloud

## Features
- User Registration and Login
- JWT Authentication
- Role-based Access Control (Admin, Project Manager, Collaborator)
- Task Creation, Assignment, and Tracking
- Kanban Board (To Do, In Progress, Completed)
- Real-time Notifications
- Secure API with bcrypt password hashing

## Setup Instructions

### Prerequisites
- Node.js
- PostgreSQL
- Git

### Backend Setup
Run these commands:
cd backend
npm install

Create .env file in backend folder with:
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management_db
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=mysecretkey123

Run backend:
node server.js

### Frontend Setup
Run these commands:
cd frontend
npm install
npm start

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| GET | /api/tasks/:id | Get single task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get single user |
| PUT | /api/users/:id | Update user |
| PUT | /api/users/:id/deactivate | Deactivate user |

## Database Schema
- **users** - User accounts and roles
- **tasks** - Task details and assignments  
- **notifications** - User notifications

## GitHub Repository
https://github.com/ThanuriMithara/task-management-system