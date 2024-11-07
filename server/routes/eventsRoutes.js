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
  }
});

router.post("/new-event", (req, res) => {
  //   console.log(req.body);
  const newEvent = req.body;
  const userToken = req.header("Authorization") || true;
  const userEmail = req.header("email");
  const eventsArray = [
    newEvent.date,
    newEvent.time,
    Number(newEvent.len),
    newEvent.street,
    newEvent.suite,
    newEvent.description,
    Number(newEvent.waiters_sum),
    Number(newEvent.payment),
    newEvent.is_global,
    newEvent.has_sleep,
  ];
  console.log("email: ", userEmail);

  if (userToken) {
    sqlQuerySelect(
      "id",
      "employers",
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
      "employers",
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
          // console.log("Number(event.id): ", Number(event.id));
          // console.log("Number(results[0].id): ", Number(results[0].id));
          // return;

          sqlQueryDelete(
            "events",
            ["id", "employer_fk"],
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
                  ["event_fk"],
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

export default router;
