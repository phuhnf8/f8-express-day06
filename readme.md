# Express JS Day 05

# Overview

This repository contains the code and the sql file to create chat application, using JWT based authentication system with Express JS and MySQL database.

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

`POST /api/auth/register` - Signup new user

`POST /api/auth/login` - Login with email and password, receive JWT token

`POST /api/conversations` - Create new conversation

`GET /api/conversations` - Get all conversations of the logged in user

`POST /api/conversations/:id/participants` - Add participant to conversation by conversation id and user_id in body

`POST /api/conversations/:id/messages` - Send new message to the conversation

`GET /api/conversations/:id/messages` - Get messages from the conversation

`GET /api/users/search?q=email` - Search user by email to add to conversation

# Todo List

- [ ] Create Offset-based Pagination for Messages in Conversations
- [ ] Hashing password before storing in database
- [ ] Input validation, using Joi.
- [ ] Alter data type of message_id
