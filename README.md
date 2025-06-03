# Book Management API

This is a full-featured Book Management REST API built using **Node.js** and **SQLite**, with added support for **GraphQL** and **Swagger documentation**.

It also includes a simple **Deno** script to demonstrate usage and compare both technologies.

---

## Features

- CRUD operations for managing books
- REST API with validation using `express-validator`
- GraphQL endpoint for book queries
- Swagger documentation using `swagger-jsdoc` and `swagger-ui-express`
- SQLite as the database (persistent file-based storage)
- Modular and scalable project structure
- Simple Deno script to list books

---

## Tech Stack

- **Node.js** with Express
- **SQLite3**
- **GraphQL** (via `express-graphql`)
- **Swagger** for API documentation
- **Deno** for script demo

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or above)
- [Deno](https://deno.land/) (latest)
- Git

---

## Setup Instructions (Node.js)

1. **Clone the Repository**
   ``bash
   git clone <https://github.com/Hmxa715/DPL-Growth-Plan-Month-4.git>
   cd DPL-Growth-Plan-Month-4
2. ** install packages
    ``bash
    npm install
3. ** Create .env file and add code
   ``bash
    PORT=3000
    DB_FILE=./books.db
4. ** Run Project
    ``bash
    npm start
5. **Access the API
    API Base URL: <http://localhost:3000/api/books>
    Swagger Docs: <http://localhost:3000/api-docs>
    GraphQL UI: <http://localhost:3000/graphql>

## Setup Instructions (Deno)
    Here are instruction
    Ensure Deno is installed: <https://deno.land/manual@v1.41.0/getting_started/installation>
    
1. ** Run Script
    ``bash
    deno run --allow-read ./deno/list_books.ts

## Node.js vs DenoJS - Brief Comparison

| Feature            | Node.js                             | DenoJS                                   |
| ------------------ | ----------------------------------- | ---------------------------------------- |
| Runtime            | Mature, widely used, NPM ecosystem  | Modern, secure by default, no NPM        |
| Module System      | CommonJS (`require`) & ESM          | Native ESM (`import` only)               |
| Package Management | Uses `package.json`, `node_modules` | Direct URL imports or `deno.json`        |
| Permissions        | No built-in security                | Secure by default (e.g., `--allow-read`) |
| Built-in Tools     | Minimal                             | Includes formatter, bundler, test runner |
| TypeScript Support | Requires setup                      | Native                                   |

## Verdict

1.Use Node.js for mature production-grade applications.
2.Use Deno for modern, lightweight scripting or projects prioritizing security and TypeScript-first development.

## Project Structure

book-management-api/
│
├── controllers/         # Route handlers
├── graphql/             # GraphQL schema & resolvers
├── models/              # SQLite DB & helper functions
├── routes/              # Express routers
├── swagger.js           # Swagger config
├── deno/                # Deno demo scripts
├── .env                 # Environment variables
├── app.js               # Main Express app
└── README.md
