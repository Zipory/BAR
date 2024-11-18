import fs from "fs";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mysql from "mysql2";
import { connection, pool } from "./connection.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import requestsRoutes from "./routes/requestsRoutes.js";
import {
  getCurrentDate,
  getCurrentTime,
  cutIsoDate,
  sqlQueryInsert,
  sqlQuerySelect,
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

    //check if the user enter email and password
    if (!user.email || !user.password) {
      res.status(500).json({
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

      res
        .status(200)
        .send({ message: "Login successful", succeed: true, data: response });
    } else {
      //if the user not exist
      //send response
      res.status(500).json({
        message: "There is no account with this details",
        succeed: false,
        data: { token: null },
      });
    }
  } catch {
    //if there is an error
    res.status(500).json({
      message: "Error fetching data from the database",
      succeed: false,
      data: { token: null },
    });
  }
}
//login
app.post("/login", loginFunction);

//register
app.post("/register", (req, res) => {
  const user = req.body;

  if (!user.isAwaiter) {
    sqlQuerySelect(
      "*",
      "companies",
      ["email"],
      "=",
      [user.email],
      0,
      (err, results) => {
        if (err) {
          res.status(500).json({
            message: "Error fetching data from the database",
            succeed: false,
          });
        } else {
          if (results.length > 0) {
            res.status(500).json({
              message: "There is already an account with this details",
              succeed: false,
            });
          } else {
            sqlQuerySelect(
              "*",
              "companies",
              ["company_name"],
              "=",
              [user.company_name],
              0,
              (err, results) => {
                if (err) {
                  res.status(500).json({
                    message: "Error fetching data from the database",
                    succeed: false,
                  });
                } else {
                  if (results.length > 0) {
                    res.status(500).json({
                      message: "There is already an account with this details",
                      succeed: false,
                    });
                  } else {
                    //register employer

                    sqlQueryInsert(
                      "companies",
                      company_insert,
                      [
                        user.company_name,
                        user.manager,
                        user.manager_phone,
                        user.email,
                        user.password,
                        user.about,
                        "active",
                      ],
                      (err, results) => {
                        if (err) {
                          res.status(500).json({
                            message:
                              "Error inserting employer data into the database",
                            succeed: false,
                          });
                        } else {
                          res.status(200).json({
                            message: "Account created successfully",
                            succeed: true,
                          });
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      }
    );
  } else {
    sqlQuerySelect(
      "*",
      "waiters",
      ["email"],
      "=",
      [user.email],
      0,
      (err, results) => {
        if (err) {
          res.status(500).json({
            message: "Error fetching data from the database",
            succeed: false,
          });
        } else {
          if (results.length > 0) {
            res.status(500).json({
              message: "There is already an account with this details",
              succeed: false,
            });
          } else {
            sqlQueryInsert(
              "waiters",
              waiter_insert,
              [
                user.first_name,
                user.last_name,
                user.phone,
                user.birthday,
                user.email,
                user.password,
                user.gender,
                "active",
              ],
              (err, results) => {
                if (err) {
                  res.status(500).json({
                    message: "Error inserting waiter data into the database",
                    succeed: false,
                  });
                } else {
                  res.status(200).json({
                    message: "Successfully registered",
                    succeed: true,
                  });
                }
              }
            );
          }
        }
      }
    );
  }
});

app.use("/events", eventsRoutes);
app.use("/requests", requestsRoutes);
/*-----------------set listener open on port 4000 ------------------ */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function generateToken(user) {
  console.log("user details: ", user);

  return jwt.sign(
    { id: user.id, isAwaiter: user.isAwaiter, name: user.name },
    process.env.SECRET_KEY,
    { expiresIn: "30d" }
  );
}
