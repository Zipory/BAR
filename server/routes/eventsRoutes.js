import e, { Router } from "express";
import mysql from "mysql2";
import express from "express";
import { connection, pool } from "../connection.js";
import dotenv from "dotenv";
import {
  getCurrentDate,
  getCurrentTime,
  cutIsoDate,
  capitalizeFirstLetter,
  sqlQueryInsert,
  sqlQuerySelect,
  sqlQueryDelete,
  sqlQueryUpdate,
  selectCompanies,
  authenticateToken,
  extractingUserDetails,
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

async function getAllEvents(req, res) {
  try {
    // get all future events with company name
    let results = await pool.query(
      `SELECT e.*, c.company_name FROM events e
       JOIN companies c ON e.company_id = c.id 
       WHERE (e.e_date > CURDATE()) 
       OR (e.e_date = CURDATE() AND e.e_time > CURTIME()) 
       ORDER BY e.e_date, e.e_time;`
    );
    let resultsArray = [...results[0]];

    // cut iso date
    resultsArray.forEach((event) => {
      event.e_date = cutIsoDate(event.e_date);
    });

    res.status(200).json({
      message: "Events fetched successfully",
      succeed: true,
      data: results[0],
    });
  } catch {
    res.status(500).json({
      message: "Error fetching data from the database",
      succeed: false,
    });
  }
}

router.get("/", authenticateToken, getAllEvents);

async function getSoonEvents(req, res) {
  //TODO : add a variable for rating status per event for waiters
  //TODO : add a variable for rating status per event and waiter for companies
  try {
    // get all events for user sorted by status and date
    const user = await extractingUserDetails(req.headers["authorization"]);
    //capitalize status
    const status = capitalizeFirstLetter(req.params.status);

    //check if user is an awaiter
    if (user.isAwaiter) {
      //check if status is valid
      if (status !== "Pending" && status !== "Future" && status !== "Past") {
        return res
          .status(500)
          .json({ message: "Invalid status", succeed: false });
      }
      //created a query for each status
      const future = `requests.status = 'approved' AND events.e_date > '${getCurrentDate()}' 
      OR (events.e_date = '${getCurrentDate()}' AND events.e_time > '${getCurrentTime()}')`;

      const past = `requests.status = 'approved' AND events.e_date < '${getCurrentDate()}'
        OR (events.e_date = '${getCurrentDate()}' AND events.e_time < '${getCurrentTime()}')`;

      const pending = `requests.status = 'pending' AND events.e_date > '${getCurrentDate()}'
        OR (events.e_date = '${getCurrentDate()}' AND events.e_time > '${getCurrentTime()}')`;
      //run query
      //join tables
      //join company name
      let results = await pool.query(
        `SELECT events.*, companies.company_name
          FROM requests
          JOIN events ON requests.event_id = events.id
          JOIN companies ON events.company_id = companies.id
          WHERE requests.waiter_id = ?
          AND (${
            status === "Future" ? future : status === "Past" ? past : pending
          })`,
        [user.id]
      );
      //cut iso date
      let resultsArray = [...results[0]];
      resultsArray.forEach((event) => {
        event.e_date = cutIsoDate(event.e_date);
      });
      //send response
      return res.status(200).json({
        message: "Events fetched successfully",
        succeed: true,
        data: resultsArray,
      });
    } else {
      //if user is a company
      //check if status is valid
      if (status !== "Future" && status !== "Past") {
        return res
          .status(500)
          .json({ message: "Invalid status", succeed: false });
      }
      //created a query for each status
      const future = `events.e_date > '${getCurrentDate()}' OR events.e_date = '${getCurrentDate()}' AND events.e_time >' ${getCurrentTime()}'`;
      const past = `e_date < '${getCurrentDate()}' OR e_date = '${getCurrentDate()}' AND e_time < '${getCurrentTime()}'`;
      //run query
      let results = await pool.query(
        `SELECT * FROM events WHERE company_id = ? AND ${
          status === "Future" ? future : past
        }`,
        [user.id]
      );
      //cut iso date
      let resultsArray = [...results[0]];

      resultsArray.forEach((event) => {
        event.e_date = cutIsoDate(event.e_date);
      });
      //send response
      return res.status(200).json({
        message: "Events fetched successfully",
        succeed: true,
        data: resultsArray,
      });
    }
  } catch (err) {
    //log error
    console.log(err);
    //send error
    return res.status(500).json({
      message: "Error fetching data from the database",
      succeed: false,
      data: null,
    });
  }
}
router.get("/my-events/:status", authenticateToken, getSoonEvents);

// router.get("/:email/:status", authenticateToken, (req, res) => {
//   //user details

//   const isAwaiter = req.header("isAwaiter") === "true";
//   const userEmail = req.params.email;
//   const status = capitalizeFirstLetter(req.params.status);
//   let stage = status === "Pending" ? "Pending" : "Approved";
//   // console.log("isAwaiter: ", isAwaiter);

//   // console.log("userEmail: ", userEmail);

//   //if user is logged

//   //if user is an awaiter
//   if (isAwaiter) {
//     sqlQuerySelect(
//       "id",
//       "waiters",
//       ["email"],
//       "=",
//       [userEmail],
//       0,
//       (err, results) => {
//         if (err) {
//           res.status(500).json({
//             message: "Error finding waiter ID inside database",
//             succeed: false,
//           });
//         } else {
//           connection.query(
//             `SELECT events.*

//             FROM requests
//             JOIN events ON requests.event_id = events.id
//             WHERE requests.waiter_id =?
//               AND requests.status =? ${
//                 status === "Future"
//                   ? `AND events.e_date >=${getCurrentDate()}`
//                   : status === "Past"
//                   ? `AND events.e_date <${getCurrentDate()}`
//                   : ""
//               };`,
//             [results[0].id, stage],
//             (err, results) => {
//               if (err) {
//                 res.status(500).json({
//                   message: "Error finding waiter events inside database",
//                   succeed: false,
//                 });
//               } else {
//                 let resultsArray = [...results];

//                 // cut iso date
//                 resultsArray.forEach((event) => {
//                   event.e_date = cutIsoDate(event.e_date);
//                 });

//                 res.status(200).json({
//                   message: "Events fetched successfully",
//                   succeed: true,
//                   data: resultsArray,
//                 });
//               }
//             }
//           );
//         }
//       }
//     );
//   } else {
//     // if user is an company
//     //find company id
//     sqlQuerySelect(
//       "id",
//       "companies",
//       ["email"],
//       "=",
//       [userEmail],
//       0,
//       (err, results) => {
//         if (err) {
//           res.status(500).json({
//             message: "Error finding employer ID inside database",
//             succeed: false,
//           });
//         } else if (results.length > 0) {
//           console.log("results[0].id: ", results[0].id);

//           //find events of company with company id
//           sqlQuerySelect(
//             "*",
//             "events",
//             ["company_id"],
//             "=",
//             [results[0].id],
//             0,
//             (err, results) => {
//               if (err) {
//                 res.status(500).json({
//                   message: "Error finding events inside database",
//                   succeed: false,
//                 });
//               } else {
//                 let resultsArray = [...results];

//                 // cut iso date
//                 resultsArray.forEach((event) => {
//                   event.e_date = cutIsoDate(event.e_date);
//                 });
//                 if (status === "Future") {
//                   resultsArray = resultsArray.filter((event) => {
//                     return event.e_date >= getCurrentDate();
//                   });
//                 } else {
//                   resultsArray = resultsArray.filter((event) => {
//                     return event.e_date < getCurrentDate();
//                   });
//                 }

//                 res.status(200).json({
//                   message: "Events found successfully",
//                   succeed: true,
//                   data: resultsArray,
//                 });
//               }
//             }
//           );
//         } else {
//           res.status(200).json({
//             message: "There is no company with this email",
//             succeed: false,
//           });
//         }
//       }
//     );
//   }
// });

// async function newEvent(req, res) {
//   const user = await extractingUserDetails(req.headers["authorization"]);
//   const isAwaiter = user.isAwaiter;
//   const event = req.body;

//   if (!isAwaiter) {
//     return res.status(401).send({
//       message: "You are not allowed to add events",
//       succeed: false,
//     });
//     if (event.event_id) {
//     }
//   }
// }

// router.post("/new-event", authenticateToken, newEvent);

router.post("/new-event", authenticateToken, (req, res) => {
  //   console.log(req.body);
  console.log("req.body: ", req.body);

  const newEvent = req.body;
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
      } else if (results.length > 0) {
        //   res.status(200).send(JSON.stringify(results[0].id));
        eventsArray.unshift(Number(results[0].id));
        sqlQueryInsert("events", events_Fields, eventsArray, (err, results) => {
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
        });
      } else {
        res.status(200).json({
          message: "There is no company with this email",
          succeed: false,
        });
      }
    }
  );
});

/**---------------------------------------------------------- */
async function deleteEvent(req, res) {
  let connection;

  try {
    const userEmail = req.header("email");
    const isAwaiter = req.header("isAwaiter") === "true";
    const event = req.body;

    if (!(userEmail && event.event_id)) {
      return res.status(401).send({ message: "Unauthorized", succeed: false });
    }
    if (isAwaiter) {
      return res.status(401).send({
        message: "You are not allowed to delete this event",
        succeed: false,
      });
    }
    connection = await pool.getConnection();

    await connection.beginTransaction();
    let company_id = await connection.query(
      `SELECT id FROM companies WHERE email = ? LIMIT 1`,
      [userEmail]
    );

    company_id = company_id[0][0].id;

    await connection.query(
      `UPDATE events SET status = 'Canceled' WHERE id = ? AND company_id = ?`,
      [event.event_id, company_id]
    );

    await connection.query(
      `UPDATE requests SET status = 'Rejected' WHERE event_id = ?`,
      [event.event_id]
    );

    await connection.commit();
    res
      .status(200)
      .json({ message: "Event deleted successfully", succeed: true });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ message: "Error deleting event", succeed: false });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

router.delete("/delete-event", authenticateToken, deleteEvent);

router.put("/update-event", authenticateToken, (req, res) => {
  const userEmail = req.header("email");
  const event = req.body;
  const [arrayField, arrayContent] = arrayToSet(event);
  // console.log("event: ", event);

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
