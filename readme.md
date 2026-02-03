# Express JS Day 06

# Overview

This repository contains the code and the sql file to create todo list application, using JWT based authentication system with Express JS and MySQL database.

# Installation

1. Clone the repository, import the database using the `db/sql.sql` file.

2. Create a `.env` file in the root directory and add the following environment variables:

```
DB_HOST=host
DB_USER=username
DB_PASSWORD=password
DB_NAME=db_test
DB_PORT=3306

SECRET_KEY=your_jwt_secret_key
```

3. Install deps and start the server:

```bash
yarn
yarn start
```

Default server runs at `http://localhost:3000`

# API Endpoints

`POST /auth/register` - Signup new user

```js
{
    username: "Your Name",
    email: "email@example.com",
    password: "your_password"
}
```

`POST /auth/login` - Login with email and password, receive JWT token

```js
{
    email: "email@example.com",
    password: "your_password"
}
```

`POST /auth/logout` - Logout user by invalidating the token

`POST /auth/refresh-token` - Refresh JWT token with body payload:

```js
{
	refresh_token: "your_refresh_token";
	access_token: "your_access_token";
}
```

Todos API (Requires Authorization header with Bearer token)
`GET /api/todos` - Get all todos for the authenticated user
`GET /api/todos/:id` - Get a specific todo by ID for the authenticated user
`POST /api/todos` - Create a new todo

```js
{
	title: "Todo Title";
}
```

`DELETE /api/todos/:id` - Delete a specific todo by ID for the authenticated user

# Todo List

- [ ] Create Offset-based Pagination for Messages in Conversations
- [x] Hashing password before storing in database
- [ ] Input validation, using Joi.
