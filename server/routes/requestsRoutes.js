import express from "express";
import dotenv from "dotenv";
import {
  getCurrentDate,
  getCurrentTime,
  cutIsoDate,
  sqlQueryInsert,
  sqlQuerySelect,
  sqlQueryDelete,
  sqlQueryUpdate,
  capitalizeFirstLetter,
} from "../sources/function.js";
import e from "express";
dotenv.config();
const router = express.Router();

router.post("/new-request", (req, res) => {
  const userToken = req.header("Authorization") || true;
  const userEmail = req.header("email");
  const request = req.body;
  console.log("request: ", request);

  //check if user is logged in
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
          message: "Error finding waiter ID inside database 1",
          succeed: false,
        });
      } else if (
        results.length > 0 &&
        typeof Number(request.event_id) === "number"
      ) {
        //insert request in database
        sqlQueryInsert(
          "requests",
          ["waiter_id", "event_id", "status"],
          [Number(results[0].id), Number(request.event_id), "Pending"],
          (err, results) => {
            if (err) {
              res.status(500).json({
                message: "Error creating request",
                succeed: false,
              });
            } else {
              res.status(200).json({
                message: "Request created successfully",
                succeed: true,
              });
            }
          }
        );
      } else {
        res.status(500).json({
          message: "Error finding waiter ID inside database 2",
          succeed: false,
        });
      }
    }
  );
});
router.delete("/delete-request", (req, res) => {
  const userToken = req.header("Authorization") || true;
  const userEmail = req.header("email");
  const request = req.body;
  if (userToken) {
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
            message: "Error finding waiter ID inside database 1",
            succeed: false,
          });
        } else if (
          results.length > 0 &&
          typeof Number(request.event_id) === "number"
        ) {
          //need to add transaction
        }
      }
    );
  } else {
    res.status(401).json({ message: "Unauthorized", succeed: false });
  }
});

export default router;
