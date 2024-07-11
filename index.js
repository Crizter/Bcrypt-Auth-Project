import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
const port = process.env.PORT || 3000;

const app = express();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM usersData WHERE email = $1", [email]);
    
    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
        if (err) {
          res.send(err);
        } else {
          const result = await db.query(
            "INSERT INTO usersData (email, password) VALUES ($1, $2)",
            [email, hashedPassword]
          );
          console.log(result);
          res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;

  try {
    const result = await db.query("SELECT * FROM usersData WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      bcrypt.compare(loginPassword, storedPassword, async (err, isMatch) => {
        if (err) {
          console.log(err);
        } else {
          if (isMatch) {
            res.render("secrets.ejs");
          } else {
            res.send('Incorrect password');
          }
        }
      });

    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});