import { Router } from "express";
import mysql from "mysql2";

import express from "express";
import { connection } from "../connection.js";
import dotenv from "dotenv";
import {
  getCurrentDate,
  getCurrentTime,
  cutIsoDate,
  sqlQueryInsert,
  sqlQuerySelect,
  sqlQueryDelete,
  sqlQueryUpdate,
} from "../sources/function.js";

import {
  waiter_ditails,
  employer_ditails,
  events_Fields,
  waiters_Fields_Select,
  employers_Fields_Select,
} from "../sources/variables.js";
dotenv.config();
const router = express.Router();

router.get("/", (req, res) => {
  // const userToken = JSON.parse(req.header("Authorization")) || true;
  const userToken = req.header("Authorization") || true;

  //Get all events with limit - optional
  if (userToken) {
    sqlQuerySelect(
      "*",
      "events",
      ["e_date"],
      ">=",
      [getCurrentDate()],
      0,
      (err, results) => {
        if (err) {
          res.status(500).json({
            message: "Error fetching data from the database",
            succeed: false,
          });
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

          res.status(200).json({
            message: "Events fetched successfully",
            succeed: true,
            resultsArray,
          });
        }
      }
    );
  } else {
    res.status(401).send({ message: "Unauthorized", succeed: false });
  }
});
router.get("/:email", (req, res) => {
  //user details
  const userToken = req.header("Authorization") || true;
  const userEmail = req.params.email;
  const isAwaiter = req.header("isAwaiter") === "true";
  console.log("isAwaiter: ", isAwaiter);

  console.log("userEmail: ", userEmail);

  //if user is logged
  if (userToken) {
    //if user is an awaiter
    if (isAwaiter) {
      //TODO : implement awaiter case
      sqlQuerySelect(
        "id",
        "waiters",
        ["email"],
        "=",
        [userEmail],
        0,
        (err, results) => {
          if (err) {
            res.status(500).json({
              message: "Error finding waiter ID inside database",
              succeed: false,
            });
          } else {
            connection.query(
              `      SELECT events.*
            FROM requests
            JOIN events ON requests.event_id = events.id
            WHERE requests.waiter_id =?
              AND requests.status = 'Approved';`,
              [results[0].id],
              (err, results) => {
                if (err) {
                  res.status(500).json({
                    message: "Error finding waiter events inside database",
                    succeed: false,
                  });
                } else {
                  let resultsArray = [...results];

                  // cut iso date
                  resultsArray.forEach((event) => {
                    event.e_date = cutIsoDate(event.e_date);
                  });

                  res.status(200).json({
                    message: "Events fetched successfully",
                    succeed: true,
                    data: resultsArray,
                  });
                }
              }
            );
          }
        }
      );
    } else {
      // if user is an employer
      //find employer id
      sqlQuerySelect(
        "id",
        "companies",
        ["email"],
        "=",
        [userEmail],
        0,
        (err, results) => {
          if (err) {
            res.status(500).json({
              message: "Error finding employer ID inside database",
              succeed: false,
            });
          } else {
            console.log("results[0].id: ", results[0].id);

            //find events of employer with employer id
            sqlQuerySelect(
              "*",
              "events",
              ["company_id"],
              "=",
              [results[0].id],
              0,
              (err, results) => {
                if (err) {
                  res.status(500).json({
                    message: "Error finding events inside database",
                    succeed: false,
                  });
                } else {
                  let resultsArray = [...results];

                  // cut iso date
                  resultsArray.forEach((event) => {
                    event.e_date = cutIsoDate(event.e_date);
                  });

                  res.status(200).json({
                    message: "Events found successfully",
                    succeed: true,
                    data: resultsArray,
                  });
                }
              }
            );
          }
        }
      );
    }
  } else {
    res.status(401).json({ message: "Unauthorized", succeed: false });
  }
});

router.post("/new-event", (req, res) => {
  //   console.log(req.body);
  console.log("req.body: ", req.body);

  const newEvent = req.body;
  const userToken = req.header("Authorization") || true;
  const userEmail = req.header("email");
  const eventsArray = [
    newEvent.date,
    newEvent.time,
    Number(newEvent.e_duration),
    newEvent.location,
    newEvent.suite,
    newEvent.description,
    Number(newEvent.waiters_amount),
    Number(newEvent.salary),
    newEvent.is_global,
    newEvent.has_sleep,
  ];
  console.log("email: ", userEmail);

  if (userToken) {
    sqlQuerySelect(
      "id",
      "companies",
      ["email"],
      "=",
      [userEmail],
      0,
      (err, results) => {
        if (err) {
          res.status(500).json({
            message: "Error finding employer ID inside database",
            succeed: false,
          });
        } else {
          //   res.status(200).send(JSON.stringify(results[0].id));
          eventsArray.unshift(Number(results[0].id));
          sqlQueryInsert(
            "events",
            events_Fields,
            eventsArray,
            (err, results) => {
              if (err) {
                res
                  .status(500)
                  .json({ message: "Error creating event", succeed: false });
              } else {
                res.status(200).json({
                  message: "Event created successfully",
                  succeed: true,
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.status(401).send({ message: "Unauthorized", succeed: false });
  }
});

router.delete("/delete-event", (req, res) => {
  const userToken = req.header("Authorization") || true;
  const userEmail = req.header("email");
  const event = req.body;

  if (userToken) {
    sqlQuerySelect(
      "id",
      "companies",
      ["email"],
      "=",
      [userEmail],
      0,
      (err, results) => {
        if (err) {
          res.status(500).json({
            message: "Error finding employer ID inside database",
            succeed: false,
          });
        } else {
          sqlQueryDelete(
            "events",
            ["id", "company_id"],
            "=",
            [Number(event.id), Number(results[0].id)],
            (err, results) => {
              if (err) {
                res.status(500).json({
                  message: "Error deleting event from the database",
                });
              } else {
                sqlQueryDelete(
                  "requests",
                  ["event_id"],
                  "=",
                  [Number(event.id)],
                  (err, results) => {
                    if (err) {
                      res.status(500).json({
                        message: "Error deleting requests from the database",
                      });
                    } else {
                      res.status(200).json({
                        message: "Event & requests deleted successfully",
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } else {
    res.status(401).send({
      message: "Unauthorized",
      succeed: false,
    });
  }
});

router.put("/update-event", (req, res) => {
  const userToken = req.header("Authorization") || true;
  const userEmail = req.header("email");
  const event = req.body;
  const [arrayField, arrayContent] = arrayToSet(event);
  // console.log("event: ", event);

  if (userToken) {
    sqlQuerySelect(
      "id",
      "companies",
      ["email"],
      "=",
      [userEmail],
      0,
      (err, results) => {
        if (err) {
          res.status(500).json({
            message: "Error finding employer ID inside database",
            succeed: false,
          });
        } else {
          sqlQueryUpdate(
            "events",
            arrayField,
            arrayContent,
            ["id", "company_id"],
            "=",
            [event.event_id, results[0].id],
            (err, results) => {
              if (err) {
                res.status(500).json({
                  message: "Error during updating event",
                  succeed: false,
                });
              } else {
                res.status(200).json({
                  message: "Event updated successfully",
                  succeed: true,
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.status(401).send("Unauthorized");
  }
});

export default router;

function arrayToSet(event) {
  let arrayField = [];
  let arrayContent = [];

  if (event.date && event.date >= getCurrentDate()) {
    arrayField.push("e_date");
    arrayContent.push(event.date);
  }
  if (event.time && event.time > getCurrentTime()) {
    arrayField.push("e_time");
    arrayContent.push(event.time);
  }
  if (event.e_duration > 0) {
    arrayField.push("e_duration");
    arrayContent.push(Number(event.e_duration));
  }
  if (event.location) {
    arrayField.push("location");
    arrayContent.push(event.location);
  }
  if (event.suite) {
    arrayField.push("suite");
    arrayContent.push(event.suite);
  }
  if (event.description) {
    arrayField.push("event_description");
    arrayContent.push(event.description);
  }
  if (event.waiters_amount > 0) {
    arrayField.push("waiters_amount");
    arrayContent.push(Number(event.waiters_amount));
  }
  if (event.salary > 0) {
    arrayField.push("salary");
    arrayContent.push(Number(event.salary));
  }
  if (event.is_global) {
    arrayField.push("is_global");
    arrayContent.push(event.is_global);
  }
  if (event.has_sleep) {
    arrayField.push("has_sleep");
    arrayContent.push(event.has_sleep);
  }
  console.log("arrayField: ", arrayField);
  console.log("arrayContent: ", arrayContent);

  return [arrayField, arrayContent];
}
