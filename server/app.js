import fs from "fs";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mysql from "mysql2";

dotenv.config();
// const { log } = require("console");
// const bcrypt = require("bcrypt");
const app = express();

/**----------------Variables---------------- */
const waiters_Fields_Insert = [
  "first_name",
  "last_name",
  "phone",
  "birthday",
  "email",
  "w_password",
  "gender",
  "avg_rating",
  "status",
];

const employers_Fields_Insert = [
  "company_name",
  "manager",
  "manager_phone",
  "email",
  "e_password",
  "about",
  "avg_rating",
  "status",
];

const eventsFieldsSelect = [
  "employer_fk",
  "e_date",
  "e_time",
  "length",
  "street",
  "suite",
  "event_description",
  "waiters_sum",
  "payment",
  "is_global",
  "has_sleep",
];

const employer_Fields_Select = [
  "id ",
  "company_name",
  "manager",
  "manager_phone",
  "email",
  "about",
  "avg_rating",
]; //Query for employer
const waiter_Fields_Select = [
  "first_name",
  "last_name",
  "phone",
  "birthday",
  "email",
  "gender",
  "avg_rating",
]; //Query for waiter

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
const port = 4000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
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

/*-----------------Routes----------------------- */

app.post("/login", (req, res) => {
  const user = req.body; //catch the user
  let response = {}; //variable for response
  const arr = [user.email]; //Dynamic array for query

  sqlQuerySelect(
    `${user.isAwaiter ? waiter_Fields_Select : employer_Fields_Select}`,
    `${user.isAwaiter ? "waiters" : "employers"}`,
    ["email"],
    "=",
    arr,
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

  if (!user.isAwaiter) {
    sqlQuerySelect(
      "*",
      "employers",
      ["email"],
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
            res.status(500).send(
              JSON.stringify({
                message: "There is already an account with this details",
                succeed: false,
              })
            );
          } else {
            sqlQuerySelect(
              "*",
              "employers",
              ["company_name"],
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
                      employers_Fields_Insert,
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
              waiters_Fields_Insert,
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

app.get("/events", (req, res) => {
  // const userToken = JSON.parse(req.header("Authorization")) || true;
  const userToken = req.header("Authorization") || true;

  //Get all events with limit - optional
  if (userToken) {
    sqlQuerySelect(
      eventsFieldsSelect,
      "events",
      ["e_date"],
      ">=",
      [getCurrentDate()],
      0,
      (err, results) => {
        if (err) {
          res
            .status(500)
            .send(JSON.stringify("Error fetching events from the database"));
        } else {
          // create a copy of results
          let resultsArray = [...results];

          // cut iso date
          resultsArray.forEach((event) => {
            event.e_date = cutIsoDate(event.e_date);
          });

          // filter out events that have passed
          resultsArray = resultsArray.filter((event) => {
            return (
              event.e_date > getCurrentDate() ||
              (event.e_date === getCurrentDate() &&
                event.e_time > getCurrentTime())
            );
          });
          // console.log("resultsArray length: ", resultsArray.length);

          res.status(200).send(JSON.stringify(resultsArray));
        }
      }
    );
  }
});

app.get("/events/:email", (req, res) => {
  const userToken = req.header("Authorization") || true;
  const isAwaiter = req.header("isAwaiter") || false;
  const tableName = isAwaiter ? "waiters" : "employers";
  const userEmail = req.params.email;
  if (userToken) {
    sqlQuerySelect(
      "id",
      tableName,
      "email",
      "=",
      userEmail,
      0,
      (err, results) => {}
    );
  }
});
//TODO:
//app.get("/events/:email"){
//header isAwaiter
//};
/*-----------------set listener open on port 4000 ------------------ */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

/*-------------------SQL Query functions----------------*/
//to use this function you must put this arguments:
// what do you want to select "string" - required
// from which table "string" - required
// where condition [array] - optional => but put an empty array []
// condition "string" - required
// compar condition [array] - optional => but put an empty array []
// limit number "number" - optional => but put 0
// callback function - required

function sqlQuerySelect(
  selectWhat,
  fromWhat,
  whereCondition = [],
  conditionChar = "=",
  comparCondition = [],
  limitNum = 0,
  callback
) {
  let sql = `SELECT ${selectWhat} FROM ${fromWhat}`;

  // Adding WHERE conditions if provided
  if (whereCondition.length > 0) {
    sql += " WHERE ";
    sql += whereCondition
      .map((condition) => `${condition} ${conditionChar} ?`)
      .join(" AND ");
  }

  // Adding LIMIT clause if specified
  if (Number(limitNum) > 0) {
    sql += ` LIMIT ${limitNum}`;
  }
  console.log("sql query: ", sql);

  // Executing the query
  connection.query(sql, comparCondition, (err, results) => {
    if (err) {
      console.error(316, "Error fetching data:", err);
      callback(err, null); // Call the callback with an error
    } else {
      // console.log(results);
      callback(null, results); // Call the callback with results
    }
  });
}

//to use this function you must put this arguments:
// table name "string" - required
// fields [array] - required
// values [array] - required
// callback function- required
//returns results of sql query in [{},{}...]
function sqlQueryInsert(table, fields = [], values = [], callback) {
  const placeholders = fields.map(() => "?").join(", ");
  const sql = `INSERT INTO ${table} (${fields.join(
    ", "
  )}) VALUES (${placeholders})`;

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      callback(err, null); // Call the callback with an error
    } else {
      callback(null, results); // Call the callback with results
    }
  });
}
//to use this function you must put this arguments:
//date in "Date" type or string
//returns current date in "string"
function cutIsoDate(e_date) {
  if (e_date instanceof Date) {
    const year = e_date.getFullYear();
    const month = String(e_date.getMonth() + 1).padStart(2, "0");
    const day = String(e_date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } else {
    console.warn("Warning: e_date is not a Date object. Value:", e_date);
    e_date = String(e_date);
    return e_date.slice(0, 10);
  }
}
//returns current date in "string"
function getCurrentDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
//returns current time in "string"
function getCurrentTime() {
  const date = new Date();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
