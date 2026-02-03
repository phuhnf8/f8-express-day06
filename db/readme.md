# Database configuration:

This project uses a MySQL database. Ensure you have MySQL installed and running on your machine.

---

-- Host: 127.0.0.1
-- Server version: 8.0.30 - MySQL Community Server - GPL
-- Server OS: Win64
-- HeidiSQL Version: 12.14.0.7165

---

Database: `db_test`
Default port: `3306`

Username: `root`. No password is set by default. You can set a password for the root user for better security.

# Schema

The diagram below illustrates the database schema, including tables and their relationships.

```
users (id PK)
conversations (
    id PK,
    created_by FK->users.id
)
conversation_participants (
    conversation_id FK->conversations.id,
    user_id FK->users.id,
    [conversation_id, user_id] PK
)
messages (
    id PK,
    conversation_id FK->conversations.id,
    sender_id FK->users.id,
    [conversation_id, sender_id] FK->conversation_participants(conversation_id, user_id)
)
```

# Importing the Database

Import the file `./sql.sql` into your MySQL server to create the database and tables.
