import fs from "fs";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mysql from "mysql2";
import { connection } from "./connection.js";
import eventsRoutes from "./routes/eventsRoutes.js";
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

app.post("/login", (req, res) => {
  const user = req.body; //catch the user
  let response = {}; //variable for response
  const userEmail = [user.email]; //Dynamic array for query
  console.log("user:", user);

  sqlQuerySelect(
    `${user.isAwaiter ? waiter_ditails : employer_ditails}`,
    `${user.isAwaiter ? "waiters" : "companies"}`,
    ["email"],
    "=",
    userEmail,
    0,
    (err, results) => {
      if (err) {
        console.error(80, "Error fetching data:", err);
        res
          .status(500)
          .send(JSON.stringify("Error fetching data from the database"));
      } else if (user.isAwaiter) {
        //If its a waiter loged
        //TODO login for waiter!
        //sqlQuery(``,[],(err,results)=>{if(err){}else{}})
      } else if (results.length > 0) {
        res.status(200).send(JSON.stringify(results[0]));
      } else {
        res.status(500).send(
          JSON.stringify({
            message: "There is no account with this details",
            succeed: false,
          })
        );
      }
    }
  );
});

//register
app.post("/register", (req, res) => {
  const user = req.body;

  // console.log("is A waiter: ", user.isAwaiter);
  // console.log("user: ", user);
  // res.status(200).json(user);
  // return;

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

/*-----------------set listener open on port 4000 ------------------ */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
