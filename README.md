Sure, here's the updated `README.md` including instructions on setting up the PostgreSQL database:

```markdown
# User Authentication Project

This is a simple Node.js application for user registration and login using Express.js, PostgreSQL, and bcrypt for password hashing.

## Features

- User registration with email and password.
- Password hashing for security.
- User login with email and password.
- Basic validation for existing users during registration.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

2. Install dependencies:

```bash
npm install
```

3. Set up your PostgreSQL database:

- Open your PostgreSQL command line interface or any PostgreSQL GUI tool.
- Create a new database called `users`:

```sql
CREATE DATABASE users;
```

- Connect to the `users` database:

```sql
\c users;
```

- Create the `usersData` table with the required columns:

```sql
CREATE TABLE usersData (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

4. Create a `.env` file in the root directory of your project with your database credentials:

```plaintext
DB_USER=your-database-username
DB_HOST=localhost
DB_NAME=users
DB_PASSWORD=your-database-password
DB_PORT=5432
SALT_ROUNDS=10
PORT=3000
```

5. Update your database configuration in the `app.js` file:

```javascript
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
```

## Usage

1. Start the server:

```bash
node app.js
```

2. Open your browser and go to `http://localhost:3000`.

## Routes

- `GET /` - Renders the home page.
- `GET /login` - Renders the login page.
- `GET /register` - Renders the registration page.
- `POST /register` - Handles user registration.
- `POST /login` - Handles user login.

## License

This project is licensed under the MIT License.

