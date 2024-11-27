import fs from "fs";
import { sendMail } from "./Gmail sender/send.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mysql from "mysql2";
import { connection, pool } from "./connection.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import requestsRoutes from "./routes/requestsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import {
  getCurrentDate,
  getCurrentTime,
  cutIsoDate,
  sqlQueryInsert,
  sqlQuerySelect,
  generateToken,
  authenticateToken,
} from "./sources/function.js";
import {
  waiter_ditails,
  employer_ditails,
  events_Fields,
  waiters_Fields_Select,
  employers_Fields_Select,
  company_insert,
  waiter_insert,
  waiter_Fields_Select,
  company_Fields_Select,
} from "./sources/variables.js";
import { register } from "module";
dotenv.config();
// const { log } = require("console");
// const bcrypt = require("bcrypt");
const app = express();

/**----------------Variables---------------- */

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
const port = 4000;

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });
/*----------------create the conection to the DB and kipp it open ----------- */
// connection.connect((err) => {
//   if (err) {
//     console.error(28, "Error connecting to the database:", err);
//     return;
//   }
//   console.log(31, "Connected to the MySQL database");
// });

/*-----------------authenticate Token----------------- */

/*-----------------Routes----------------------- */

/**-----------------login----------------- */
//async Login function

async function loginFunction(req, res) {
  try {
    const user = req.body;
    console.log("user:", user);
    console.log(!user.email);

    //check if the user enter email and password
    if (!user.email || !user.password) {
      return res.status(500).json({
        message: "Please enter your email and password",
        succeed: false,
      });
    }

    //check if the user exist
    let results = await pool.query(
      `SELECT ${
        user.isAwaiter ? waiter_Fields_Select : company_Fields_Select
      } FROM ${user.isAwaiter ? "waiters" : "companies"} WHERE email = ? AND ${
        user.isAwaiter ? " w_password" : " e_password"
      } = ? AND status = 'active';`,
      [user.email, user.password]
    );
    //if the user exist
    if (results[0].length > 0) {
      //generate token
      const name = (await user.isAwaiter)
        ? results[0][0].first_name + "" + results[0][0].last_name
        : results[0][0].company_name;
      const userToken = await generateToken({
        id: results[0][0].id,
        name: name,
        isAwaiter: user.isAwaiter,
      });

      //send response
      let response = await { ...results[0][0], token: userToken };

      return res
        .status(200)
        .send({ message: "Login successful", succeed: true, data: response });
    } else {
      //if the user not exist
      //send response
      return res.status(500).json({
        message: "There is no account with this details",
        succeed: false,
        data: { token: null },
      });
    }
  } catch {
    //if there is an error
    return res.status(500).json({
      message: "Error fetching data from the database",
      succeed: false,
      data: { token: null },
    });
  }
}
//login
app.post("/login", loginFunction);

/**-----------------register----------------- */
async function registerFunction(req, res) {
  try {
    const user = req.body;
    if (user.isAwaiter) {
      if (
        !user.first_name ||
        !user.last_name ||
        !user.phone ||
        !user.birthday ||
        !user.email ||
        !user.password ||
        !user.gender
      ) {
        return res.status(500).json({
          message: "Please enter your details",
          succeed: false,
        });
      }

      let results = await pool.query(
        `SELECT * FROM waiters WHERE email = ? OR phone = ?`,
        [user.email, user.phone]
      );
      if (results[0].length > 0) {
        return res.status(500).json({
          message: "There is already an account with this details",
          succeed: false,
        });
      }
      await pool.query(
        `INSERT INTO waiters (first_name, last_name, phone, birthday, email, w_password, gender,avg_rating, status) VALUES (?, ?, ?, ?, ?, ?, ?,?,?);`,
        [
          user.first_name,
          user.last_name,
          user.phone,
          user.birthday,
          user.email,
          user.password,
          user.gender,
          0,
          "Pending",
        ]
      );
      return res.status(200).json({
        message: "Account created successfully",
        succeed: true,
      });
    } else {
      if (
        !user.company_name ||
        !user.manager ||
        !user.manager_phone ||
        !user.email ||
        !user.password ||
        !user.about
      ) {
        return res.status(500).json({
          message: "Please enter your details",
          succeed: false,
        });
      }

      let results = await pool.query(
        `SELECT * FROM companies WHERE email = ? OR manager_phone = ?`,
        [user.email, user.manager_phone]
      );
      if (results[0].length > 0) {
        return res.status(500).json({
          message: "There is already an account with this details",
          succeed: false,
        });
      }
      await pool.query(
        `INSERT INTO companies (company_name, manager, manager_phone, email, e_password, about,avg_rating, status) VALUES (?, ?, ?, ?, ?,?, ?, ?);`,
        [
          user.company_name,
          user.manager,
          user.manager_phone,
          user.email,
          user.password,
          user.about,
          0,
          "Pending",
        ]
      );
      return res.status(200).json({
        message: "Account created successfully",
        succeed: true,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error creating account",
      succeed: false,
    });
  }
}
app.post("/register", registerFunction);
//register
// app.post("/register", (req, res) => {
//   const user = req.body;

//   if (!user.isAwaiter) {
//     sqlQuerySelect(
//       "*",
//       "companies",
//       ["email"],
//       "=",
//       [user.email],
//       0,
//       (err, results) => {
//         if (err) {
//           res.status(500).json({
//             message: "Error fetching data from the database",
//             succeed: false,
//           });
//         } else {
//           if (results.length > 0) {
//             res.status(500).json({
//               message: "There is already an account with this details",
//               succeed: false,
//             });
//           } else {
//             sqlQuerySelect(
//               "*",
//               "companies",
//               ["company_name"],
//               "=",
//               [user.company_name],
//               0,
//               (err, results) => {
//                 if (err) {
//                   res.status(500).json({
//                     message: "Error fetching data from the database",
//                     succeed: false,
//                   });
//                 } else {
//                   if (results.length > 0) {
//                     res.status(500).json({
//                       message: "There is already an account with this details",
//                       succeed: false,
//                     });
//                   } else {
//                     //register employer

//                     sqlQueryInsert(
//                       "companies",
//                       company_insert,
//                       [
//                         user.company_name,
//                         user.manager,
//                         user.manager_phone,
//                         user.email,
//                         user.password,
//                         user.about,
//                         "active",
//                       ],
//                       (err, results) => {
//                         if (err) {
//                           res.status(500).json({
//                             message:
//                               "Error inserting employer data into the database",
//                             succeed: false,
//                           });
//                         } else {
//                           res.status(200).json({
//                             message: "Account created successfully",
//                             succeed: true,
//                           });
//                         }
//                       }
//                     );
//                   }
//                 }
//               }
//             );
//           }
//         }
//       }
//     );
//   } else {
//     sqlQuerySelect(
//       "*",
//       "waiters",
//       ["email"],
//       "=",
//       [user.email],
//       0,
//       (err, results) => {
//         if (err) {
//           res.status(500).json({
//             message: "Error fetching data from the database",
//             succeed: false,
//           });
//         } else {
//           if (results.length > 0) {
//             res.status(500).json({
//               message: "There is already an account with this details",
//               succeed: false,
//             });
//           } else {
//             sqlQueryInsert(
//               "waiters",
//               waiter_insert,
//               [
//                 user.first_name,
//                 user.last_name,
//                 user.phone,
//                 user.birthday,
//                 user.email,
//                 user.password,
//                 user.gender,
//                 "active",
//               ],
//               (err, results) => {
//                 if (err) {
//                   res.status(500).json({
//                     message: "Error inserting waiter data into the database",
//                     succeed: false,
//                   });
//                 } else {
//                   res.status(200).json({
//                     message: "Successfully registered",
//                     succeed: true,
//                   });
//                 }
//               }
//             );
//           }
//         }
//       }
//     );
//   }
// });
// app.get("/protected", authenticateToken, (req, res) => {
//   sendMail(
//     "beni0548472300@gmail.com",
//     "hello",
//     false,
//     "<h1>protected route mail</h1>"
//   );

//   res.status(200).json({ message: "Protected route", succeed: true, data: {} });
// });

app.use("/events", eventsRoutes);
app.use("/requests", requestsRoutes);
app.use("/user", userRoutes);
app.use("/rating", ratingRoutes);
/*-----------------set listener open on port 4000 ------------------ */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// function generateToken(user) {
//   console.log("user details: ", user);

//   return jwt.sign(
//     { id: user.id, isAwaiter: user.isAwaiter, name: user.name },
//     process.env.SECRET_KEY,
//     { expiresIn: "30d" }
//   );
// }

// function authenticateToken(req, res, next) {
//   const token = req.headers["authorization"];

//   if (!token)
//     return res.status(401).json({ message: "Access denied", succeed: false });

//   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//     if (err)
//       return res.status(403).json({ message: "Invalid token", succeed: false });
//     console.log("user in token: ", user);

//     req.user = user;
//     next();
//   });
// }
