const fs = require("fs");
const express = require("express");
const jwt = require("jsonwebtoken");

const mysql = require("mysql2");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
const app = express();
const SECRET_KEY = "BAR_best_project_ever";

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
const port = 4000;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "bar",
});
/*----------------create the conection to the DB and kipp it open ----------- */
// connection.connect((err) => {
//   if (err) {
//     console.error(28, "Error connecting to the database:", err);
//     return;
//   }
//   console.log(31, "Connected to the MySQL database");
// });

/*-----------------authenticate Token----------------- */
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // token מתוך ה-header

  if (!token)
    return res.status(401).json({ message: "Access denied, token missing" });

  // אימות הטוקן
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

/*-----------------Routes----------------------- */
//login
//verify user
app.post("/login", (req, res) => {
  const user = req.body;
  connection.query(
    `SELECT email,password FROM ${
      user.isWaiter ? "waiters" : "employers"
    } WHERE email =? and password =?`,
    [user.email, user.password],
    (err, results) => {
      if (err) {
        console.error(316, "Error fetching data:", err);
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else {
        console.log(results);
        const token = jwt.sign(user, SECRET_KEY);
        res.json({ token });
      }
    }
  );
  //verify user
});
app.post("/register", (req, res) => {
  const user = req.body;
  let arr = [user.email];
  if (!user.isWaiter) {
    arr.push(user.companyName);
  }
  connection.query(
    `SELECT email${user.isWaiter ? "" : ",company_name"} FROM ${
      user.isWaiter ? "waiters" : "employers"
    } WHERE email =? ${user.isWaiter ? "" : "OR company_name=?"} limit 1`,
    arr,

    (err, results) => {
      if (err) {
        console.error(316, "Error fetching data:", err);
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else if (results.length === 0) {
        console.log(results);
        const token = jwt.sign(user, SECRET_KEY);
        res.json({ token });
      } else {
        res.json("the email or company name already exists");
      }
    }
  );
  //verify user
});

//route
// app.get("/protected", authenticateToken, (req, res) => {
//   res.json({
//     message: `Welcome ${req.user.username}! This is a protected route.`,
//   });
// });
/*-----------------set listener open on port 4000 ------------------ */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
