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
  } else {
    res.status(401).send("Unauthorized");
  }
});
router.get("/:email", (req, res) => {});

router.post("/new-event", (req, res) => {
  //   console.log(req.body);
  console.log("req.body: ", req.body);

  const newEvent = req.body;
  const userToken = req.header("Authorization") || true;
  const userEmail = req.header("email");
  const eventsArray = [
    newEvent.date,
    newEvent.time,
    Number(newEvent.duration),
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
          res.status(500).json("Error finding employer ID inside database");
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
                  .json("Error inserting new event into the database");
              } else {
                res.status(200).json("Event created successfully");
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

router.delete("/delete-event", (req, res) => {
  const userToken = req.header("Authorization") || true;
  const event = req.body;

  if (userToken) {
    sqlQuerySelect(
      "id",
      "companies",
      ["email"],
      "=",
      [event.email],
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
  // const userEmail = req.header("email");
  const event = req.body;
  const [arrayField, arrayContent] = arrayToSet(event);
  console.log("event: ", event);

  if (userToken) {
    sqlQueryUpdate(
      "events",
      arrayField,
      arrayContent,
      ["id", "company_id"],
      "=",
      [event.eventID, event.employerID],
      (err, results) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error during updating event", succeed: false });
        } else {
          res
            .status(200)
            .json({ message: "Event updated successfully", succeed: true });
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
  if (event.e_date && event.e_date >= getCurrentDate()) {
    arrayField.push("e_date");
    arrayContent.push(event.e_date);
  }
  if (event.e_time && event.e_time > getCurrentTime()) {
    arrayField.push("e_time");
    arrayContent.push(event.e_time);
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
  if (event.event_description) {
    arrayField.push("event_description");
    arrayContent.push(event.event_description);
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
