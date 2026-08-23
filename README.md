# Task Management System

A full-stack Task Management application built with **Node.js + Express + MongoDB** (backend) and **React.js** (frontend).

## Features
- JWT Authentication (Register / Login / Logout)
- Create, Read, Update, Delete Tasks
- Filter by Status & Search by Title
- Pagination & Sorting (API)
- Dark / Light Theme Toggle
- Responsive Design with Lucide Icons

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, Axios, Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas with Mongoose |
| Auth | JWT + bcryptjs |

## Getting Started

### Backend
```bash
cd backend
npm install
cp .env.example .env   # Fill in MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env   # Set VITE_API_URL
npm run dev
```

Open https://task-management-system-six-theta.vercel.app in your browser.
