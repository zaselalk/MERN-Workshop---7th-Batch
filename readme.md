# Student Registry — MERN Workshop (7th Batch)

A full-stack **Student Registry** web application built during the 7th Batch MERN Workshop. The app lets you manage student records and assign tasks to individual students through a clean, responsive UI.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Setup Guide](#setup-guide)
   - [1. Clone the repository](#1-clone-the-repository)
   - [2. Set up the API (back end)](#2-set-up-the-api-back-end)
   - [3. Set up the Client (front end)](#3-set-up-the-client-front-end)
7. [Environment Variables](#environment-variables)
8. [Running the Application](#running-the-application)
9. [API Reference](#api-reference)
10. [Database Schema](#database-schema)
11. [Technical Glossary](#technical-glossary)

---

## Project Overview

The Student Registry application provides two main screens:

| Screen | Path | Description |
|--------|------|-------------|
| **Home** | `/` | View all students, add a new student |
| **Student Detail** | `/:student_id` | View a student's tasks, add a new task |

Students and their tasks are persisted in a **MySQL** database via the **Sequelize** ORM. The React front end communicates with the Express REST API using **Axios**.

---

## Tech Stack

### Back End (`api/`)

| Technology | Version | Purpose |
|------------|---------|---------|
| [Node.js](https://nodejs.org/) | ≥ 18 | JavaScript runtime |
| [Express](https://expressjs.com/) | ^5 | HTTP server & routing |
| [Sequelize](https://sequelize.org/) | ^6 | ORM for MySQL |
| [mysql2](https://github.com/sidorares/node-mysql2) | ^3 | MySQL driver |
| [dotenv](https://github.com/motdotla/dotenv) | ^17 | Environment variable loading |
| [cors](https://github.com/expressjs/cors) | ^2 | Cross-Origin Resource Sharing |
| [nodemon](https://nodemon.io/) | ^3 | Auto-restart during development |

### Front End (`client/`)

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | ^19 | UI component library |
| [Vite](https://vitejs.dev/) | ^7 | Build tool & dev server |
| [React Router](https://reactrouter.com/) | ^7 | Client-side routing |
| [Axios](https://axios-http.com/) | ^1 | HTTP client |
| [Ant Design](https://ant.design/) | ^6 | UI component library |

---

## Architecture

```
┌────────────────────────────────────────────────────────┐
│                      Browser                           │
│   React (Vite)  ←─── React Router ──→  Pages/Components│
│        │                                               │
│      Axios (axiosClient)                               │
└──────────────────────┬─────────────────────────────────┘
                       │  HTTP/JSON  (default: http://localhost:3000)
┌──────────────────────▼─────────────────────────────────┐
│                  Express API Server                     │
│   /api/v1/students  ──►  studentController             │
│   /api/v1/tasks     ──►  taskController                │
│        │                                               │
│      Sequelize ORM                                     │
└──────────────────────┬─────────────────────────────────┘
                       │  SQL
┌──────────────────────▼─────────────────────────────────┐
│                    MySQL Database                       │
│   students table  ◄──(hasMany)──►  tasks table         │
└────────────────────────────────────────────────────────┘
```

**Request lifecycle:**

1. The user interacts with a React page.
2. The page calls `axiosClient` (a pre-configured Axios instance).
3. Axios sends an HTTP request to the Express server.
4. Express routes the request to the appropriate controller.
5. The controller uses Sequelize models to query MySQL.
6. The response travels back through the same chain and updates the React state.

---

## Project Structure

```
MERN-Workshop---7th-Batch/
├── api/                        # Express back-end
│   ├── controllers/
│   │   ├── studentController.js   # CRUD logic for students
│   │   └── taskController.js      # CRUD logic for tasks
│   ├── db/
│   │   └── dbConfig.js            # Sequelize connection setup
│   ├── models/
│   │   ├── index.js               # Model associations
│   │   ├── Student.js             # Student model definition
│   │   └── Task.js                # Task model definition
│   ├── routes/
│   │   ├── student.js             # Student route definitions
│   │   └── tasks.js               # Task route definitions
│   ├── utils/
│   │   └── sendServer.js          # Helper: send 500 error responses
│   ├── .env-example               # Environment variable template
│   ├── index.js                   # App entry point
│   └── package.json
│
└── client/                     # React front-end
    ├── src/
    │   ├── api/
    │   │   └── axiosClient.js     # Axios instance with interceptors
    │   ├── pages/
    │   │   ├── Home.jsx           # Student list & add-student form
    │   │   └── Student.jsx        # Task list & add-task form
    │   ├── App.jsx                # Route configuration
    │   ├── App.css                # Global styles
    │   └── main.jsx               # React entry point
    ├── vite.config.js
    └── package.json
```

---

## Prerequisites

Make sure the following are installed on your machine before proceeding:

- **Node.js** v18 or later — [Download](https://nodejs.org/)
- **npm** v9 or later (bundled with Node.js)
- **MySQL** v8 or later — [Download](https://dev.mysql.com/downloads/)
- A MySQL client such as [MySQL Workbench](https://www.mysql.com/products/workbench/) or the `mysql` CLI (optional, for inspecting the database)

---

## Setup Guide

### 1. Clone the repository

```bash
git clone https://github.com/zaselalk/MERN-Workshop---7th-Batch.git
cd MERN-Workshop---7th-Batch
```

### 2. Set up the API (back end)

```bash
cd api
npm install
```

Copy the example environment file and fill in your MySQL credentials:

```bash
cp .env-example .env
```

Open `.env` and update the values (see [Environment Variables](#environment-variables)).

Start the development server:

```bash
npm run dev
```

The API will be available at **http://localhost:3000** (or the `PORT` you configured).  
Sequelize will automatically create / alter the `students` and `tasks` tables on first run.

### 3. Set up the Client (front end)

Open a **new terminal** tab/window:

```bash
cd client
npm install
npm run dev
```

The React app will be available at **http://localhost:5173** (Vite default).

---

## Environment Variables

All environment variables for the back end are set in `api/.env`.  
Use `api/.env-example` as a template:

| Variable | Default | Description |
|----------|---------|-------------|
| `MYSQL_HOST` | `localhost` | MySQL server hostname |
| `MYSQL_USER` | `root` | MySQL username |
| `MYSQL_PASSWORD` | `password` | MySQL password |
| `MYSQL_DATABASE` | `student-db` | MySQL database name |
| `PORT` | `3000` | Port the Express server listens on |

For the front end, you can optionally create `client/.env` to override the API base URL:

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3000` | Base URL of the Express API |

---

## Running the Application

| Command | Directory | Description |
|---------|-----------|-------------|
| `npm run dev` | `api/` | Start API in watch mode (nodemon) |
| `npm start` | `api/` | Start API in production mode |
| `npm run dev` | `client/` | Start React dev server (Vite) |
| `npm run build` | `client/` | Build React app for production |
| `npm run preview` | `client/` | Preview the production build |
| `npm run lint` | `client/` | Run ESLint on the front-end code |

---

## API Reference

Base URL: `http://localhost:3000/api/v1`

### Students

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/students` | Get all students | — |
| `POST` | `/students` | Create a new student | `{ name, age, grade }` |
| `PUT` | `/students/:id` | Update a student | `{ name, age, grade }` |
| `DELETE` | `/students/:id` | Delete a student | — |

#### Example — Create a student

```bash
curl -X POST http://localhost:3000/api/v1/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","age":21,"grade":"A"}'
```

### Tasks

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/tasks/:id` | Get a student and their tasks | — |
| `POST` | `/tasks` | Create a task for a student | `{ title, description, status, studentId }` |

Valid `status` values: `pending`, `in-progress`, `completed`

#### Example — Create a task

```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Lab Report","description":"Write up experiment results","status":"pending","studentId":1}'
```

---

## Database Schema

### `Students` table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INTEGER | Primary Key, Auto Increment |
| `name` | STRING | NOT NULL |
| `age` | INTEGER | NOT NULL |
| `grade` | STRING | — |
| `createdAt` | DATETIME | Auto-managed by Sequelize |
| `updatedAt` | DATETIME | Auto-managed by Sequelize |

### `Tasks` table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INTEGER | Primary Key, Auto Increment |
| `title` | STRING | NOT NULL |
| `description` | STRING | NOT NULL |
| `status` | STRING | NOT NULL |
| `studentId` | INTEGER | Foreign Key → `Students.id` |
| `createdAt` | DATETIME | Auto-managed by Sequelize |
| `updatedAt` | DATETIME | Auto-managed by Sequelize |

**Relationship:** A `Student` has many `Tasks`; a `Task` belongs to one `Student`.

---

## Technical Glossary

| Term | Description |
|------|-------------|
| **MERN** | Acronym for **M**ongoDB/**M**ySQL, **E**xpress, **R**eact, **N**ode.js — a popular full-stack JavaScript framework combination. This project uses MySQL in place of MongoDB. |
| **REST API** | **RE**presentational **S**tate **T**ransfer Application Programming Interface — a style of web service that uses standard HTTP methods (GET, POST, PUT, DELETE) to operate on resources identified by URLs. |
| **Express** | A minimal, unopinionated Node.js web framework used to build the HTTP server and define API routes. |
| **Sequelize** | A promise-based **ORM** (Object-Relational Mapper) for Node.js that lets you interact with relational databases using JavaScript objects instead of raw SQL. |
| **ORM** | **O**bject-**R**elational **M**apper — a library that maps database tables to language objects, allowing database queries to be written as method calls. |
| **Model** | In Sequelize, a class that represents a database table and defines its columns and data types. |
| **Association** | A Sequelize concept that describes relationships between models (e.g., `hasMany`, `belongsTo`), which translates to foreign-key relationships in the database. |
| **Migration** | A version-controlled script that applies incremental changes to a database schema. Sequelize CLI supports migrations; this project uses `sync({ alter: true })` for development convenience. |
| **React** | A JavaScript library for building declarative, component-based user interfaces. |
| **Vite** | A fast front-end build tool and development server for modern JavaScript projects. |
| **React Router** | A library that enables client-side navigation in React applications without full page reloads. |
| **Ant Design (antd)** | A popular React UI component library providing pre-built, accessible components. |
| **CORS** | **C**ross-**O**rigin **R**esource **S**haring — a browser security mechanism. The `cors` middleware is enabled on the Express server so the React dev server (port 5173) can call the API (port 3000). |
| **dotenv** | A Node.js library that loads environment variables from a `.env` file into `process.env`, keeping secrets out of source code. |
| **Environment Variable** | A runtime configuration value supplied outside the application code (e.g., database credentials, port numbers). |
| **SPA** | **S**ingle-**P**age **A**pplication — a web app that loads once and dynamically updates the view using JavaScript, without full page reloads. This React app is an SPA. |
| **nodemon** | A development utility that automatically restarts the Node.js server whenever a source file changes. |
