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

// console.log("waiter_ditails: ", waiter_ditails);
// console.log("employer_ditails: ", employer_ditails);
// console.log("events_Fields: ", events_Fields);
// console.log("waiters_Fields_Select: ", waiters_Fields_Select);
// console.log("employers_Fields_Select: ", employers_Fields_Select);

/*-----------------Routes----------------------- */

app.post("/login", (req, res) => {
  const user = req.body; //catch the user
  let response = {}; //variable for response
  const userEmail = [user.email]; //Dynamic array for query
  console.log("user:", user);

  sqlQuerySelect(
    `${user.isAwaiter ? waiter_ditails : employer_ditails}`,
    `${user.isAwaiter ? "waiters" : "employers"}`,
    ["email"],
    "=",
    userEmail,
    0,
    (err, results) => {
      if (err) {
        console.error(316, "Error fetching data:", err);
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
      "employers",
      ["email"],
      "=",
      [user.email],
      0,
      (err, results) => {
        if (err) {
          res.status(500).send(
            JSON.stringify({
              message: "Error fetching data from the database",
              succeed: false,
            })
          );
        } else {
          if (results.length > 0) {
            res.status(500).json({
              message: "There is already an account with this details",
              succeed: false,
            });
          } else {
            sqlQuerySelect(
              "*",
              "employers",
              ["company_name"],
              "=",
              [user.companyName],
              0,
              (err, results) => {
                if (err) {
                  res.status(500).send(
                    JSON.stringify({
                      message: "Error fetching data from the database",
                      succeed: false,
                    })
                  );
                } else {
                  if (results.length > 0) {
                    res.status(500).send(
                      JSON.stringify({
                        message:
                          "There is already an account with this details",
                        succeed: false,
                      })
                    );
                  } else {
                    //register employer

                    sqlQueryInsert(
                      "employers",
                      employers_Fields_Select,
                      [
                        user.company_name,
                        user.manager,
                        user.manager_phone,
                        user.email,
                        user.e_password,
                        user.about,
                        user.avg_rating,
                        "active",
                      ],
                      (err, results) => {
                        if (err) {
                          res.status(500).send(
                            JSON.stringify({
                              message:
                                "Error inserting employer data into the database",
                              succeed: false,
                            })
                          );
                        } else {
                          res.status(200).send(
                            JSON.stringify({
                              message: "Account created successfully",
                              succeed: true,
                            })
                          );
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
          res
            .status(500)
            .send(JSON.stringify("Error fetching data from the database"));
        } else {
          if (results.length > 0) {
            res
              .status(500)
              .send(
                JSON.stringify("There is already an account with this details")
              );
          } else {
            sqlQueryInsert(
              "waiters",
              waiters_Fields_Select,
              [
                user.first_name,
                user.last_name,
                user.phone,
                user.birthday,
                user.email,
                user.password,
                user.gender,
                user.avg_rating,
                "active",
              ],
              (err, results) => {
                if (err) {
                  res
                    .status(500)
                    .send(
                      JSON.stringify("Error inserting data to the database 1")
                    );
                } else {
                  res
                    .status(200)
                    .send(JSON.stringify("Successfully registered"));
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

/**--------------------------------------- */
//TODO:
//app.get("/events/:email"){
//header isAwaiter
//};
/*-----------------set listener open on port 4000 ------------------ */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
