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
} from "../sources/function.js";
import {
  waitersFields,
  employersFields,
  eventsFields,
  waiter_ditails,
  employer_ditails,
} from "../sources/variables.js";
dotenv.config();
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("hello");
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
            eventsFields,
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

export default router;
