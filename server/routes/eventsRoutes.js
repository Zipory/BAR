import e, { Router } from "express";
import mysql from "mysql2";
import express from "express";
import { connection, pool } from "../connection.js";
import dotenv from "dotenv";
import { sendMail } from "../Gmail sender/send.js";
import {
  getCurrentDate,
  getCurrentTime,
  cutIsoDate,
  isValidDate,
  isValidTime,
  capitalizeFirstLetter,
  sqlQueryInsert,
  sqlQuerySelect,
  sqlQueryDelete,
  sqlQueryUpdate,
  selectCompanies,
  authenticateToken,
  extractingUserDetails,
  compareDates,
  compareTimes,
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
      `SELECT e.*, c.company_name,c.avg_rating FROM events e
       JOIN companies c ON e.company_id = c.id 
       WHERE ((e.e_date > CURDATE()) 
       OR (e.e_date = CURDATE() AND e.e_time > CURTIME()))
       AND e.status = 'Active'
       ORDER BY e.e_date, e.e_time ;`
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
      const future = `(
        events.e_date > '${getCurrentDate()}' OR 
        (events.e_date = '${getCurrentDate()}' AND events.e_time > '${getCurrentTime()}')
      )`;

      const past = `(
        events.e_date < '${getCurrentDate()}' OR 
        (events.e_date = '${getCurrentDate()}' AND events.e_time < '${getCurrentTime()}')
      )`;

      //run query
      let results = await pool.query(
        `SELECT * 
         FROM events 
         WHERE company_id = ? 
         AND ${status === "Future" ? future : past} 
         AND status = 'Active';`,
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

async function newEvent(req, res) {
  try {
    const user = await extractingUserDetails(req.headers["authorization"]);
    const isAwaiter = user.isAwaiter;
    const event = req.body;
    const approved_waiters = 0;
    const status = "Active";
    const eventArray = [
      user.id, //company_id
      event.date,
      event.time,
      Number(event.e_duration),
      event.location,
      event.suite,
      event.description,
      Number(event.waiters_amount),
      Number(event.salary),
      event.is_global ? true : false,
      event.has_sleep ? true : false,
      approved_waiters,
      status,
    ];

    if (isAwaiter) {
      return res.status(401).send({
        message: "You are not allowed to add events",
        succeed: false,
      });
    }
    if (
      !event.date ||
      !event.time ||
      !Number(event.e_duration) ||
      !event.location ||
      !event.suite ||
      !event.description ||
      !Number(event.waiters_amount) ||
      !Number(event.salary)
    ) {
      return res.status(400).send({
        message: "All fields are required",
        succeed: false,
      });
    }
    //TODO
    if (!(isValidDate(event.date) && isValidTime(event.time))) {
      return res.status(400).send({
        message: "Invalid date or time format",
        succeed: false,
      });
    }
    if (
      !(
        compareDates(event.date, ">", getCurrentDate()) ||
        (compareDates(event.date, "=", getCurrentDate()) &&
          compareTimes(event.time, ">", getCurrentTime()))
      )
    ) {
      return res.status(400).send({
        message: "Date must be in the future",
        succeed: false,
      });
    }
    let results = await pool.query(
      `SELECT * FROM events WHERE company_id = ? AND e_date = ? AND e_time = ? AND location = ? AND suite = ? `,
      [user.id, event.date, event.time, event.location, event.suite]
    );
    if (results[0].length > 0) {
      return res.status(400).send({
        message: `Event already exists at ${event.date} ${event.time} in ${event.location} ${event.suite}`,
        succeed: false,
      });
    }
    await pool.query(
      `INSERT INTO events 
       (company_id, e_date, e_time, e_duration, location, suite, event_description, waiters_amount, salary, is_global, has_sleep, approved_waiters, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      eventArray
    );

    return res.status(200).send({
      message: "Event created successfully",
      succeed: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching data from the database",
      succeed: false,
    });
  }
}

router.post("/new-event", authenticateToken, newEvent);

/**---------------------------------------------------------- */
async function deleteEvent(req, res) {
  let connection;

  try {
    //extracting user details
    const user = await extractingUserDetails(req.headers["authorization"]);
    const event = req.body;
    const company_id = user.id;
    //if there is no event id
    if (!event.event_id) {
      return res
        .status(401)
        .send({ message: "Please enter event id", succeed: false });
    }
    //if user is not a company
    if (user.isAwaiter) {
      return res.status(401).send({
        message: "You are not allowed to delete this event",
        succeed: false,
      });
    }
    //begin transaction
    connection = await pool.getConnection();
    await connection.beginTransaction();

    //check if event exists
    let results = await connection.query(
      `SELECT id,status,e_date,e_time,location FROM events WHERE id = ? AND company_id = ?`,
      [event.event_id, company_id]
    );
    //if event does not exist
    if (results[0].length === 0) {
      return res.status(401).send({
        message: "There is no event with this id",
        succeed: false,
      });
    }
    //check if event is already canceled
    if (results[0][0].status === "Canceled") {
      return res.status(401).send({
        message: "This event is already canceled",
        succeed: false,
      });
    }
    //cancel event
    await connection.query(
      `UPDATE events SET status = 'Canceled' WHERE id = ? AND company_id = ?`,
      [event.event_id, company_id]
    );
    //select waiters id
    let waiters_ids = await connection.query(
      `SELECT waiter_id FROM requests WHERE event_id = ? AND status = 'Approved'`,
      [event.event_id]
    );
    //reject all requests
    await connection.query(
      `UPDATE requests SET status = 'Rejected' WHERE event_id = ?`,
      [event.event_id]
    );

    waiters_ids = waiters_ids[0].map((row) => row.waiter_id);

    //select waiters details
    let waiters = await connection.query(
      `SELECT CONCAT(first_name, ' ', last_name) AS name, email FROM waiters WHERE id IN (?)`,
      [waiters_ids]
    );
    waiters = waiters[0].map((row) => {
      return {
        name: row.name,
        email: row.email,
      };
    });
    //send email for each waiter
    waiters.forEach((waiter) => {
      console.log("waiter:", waiter.email);

      let message = `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 400px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;" dir="rtl" lang="he-IL">
  <h2 style="color: #d9534f; text-align: center;">הודעה חשובה</h2>
  <p>הי <strong>${waiter.name}</strong>,</p>
  <p>האירוע שלך:</p>
  <ul style="list-style: none; padding: 0;">
    <li><strong>תאריך:</strong> ${cutIsoDate(results[0][0].e_date)}</li>
    <li><strong>שעה:</strong> ${results[0][0].e_time}</li>
    <li><strong>מיקום:</strong> ${results[0][0].location}</li>
  </ul>
  <p style="color: #d9534f; font-weight: bold;">בוטל.</p>
</div>
`;

      sendMail(waiter.email, "אירוע בוטל", false, message);
    });

    //commit
    await connection.commit();
    res
      .status(200)
      .json({ message: "Event deleted successfully", succeed: true });
  } catch (error) {
    //rollback
    console.log(error);

    if (connection) {
      await connection.rollback();
    }
    res
      .status(500)
      .json({ message: "Error deleting event" + " " + error, succeed: false });
  } finally {
    //release connection
    if (connection) {
      connection.release();
    }
  }
}

router.delete("/delete-event", authenticateToken, deleteEvent);

async function updateEvent(req, res) {
  try {
    //Extracting user details
    const user = await extractingUserDetails(req.headers["authorization"]);
    //Extracting event details
    const details = req.body;

    //if the user is not a company, return an error
    if (user.isAwaiter) {
      return res.status(401).json({
        message: "You are not allowed to update this event",
        succeed: false,
      });
    }
    //selecting the event
    let results = await pool.query(
      `SELECT id, e_date, e_time,location,waiters_amount,approved_waiters FROM events WHERE id = ? AND company_id = ?;`,
      [details.event_id, user.id]
    );
    //if the event does not exist, return an error
    if (results[0].length === 0) {
      return res.status(401).json({
        message: "You don't have an event with this event id",
        succeed: false,
      });
    }
    //cutting the iso date & save it in a variable
    const resultsDate = cutIsoDate(results[0][0].e_date);
    const resultsTime = results[0][0].e_time;
    //if the event is in the past, return an error

    if (
      compareDates(resultsDate, "<", getCurrentDate()) ||
      (compareDates(resultsDate, "=", getCurrentDate()) &&
        compareTimes(resultsTime, "<", getCurrentTime()))
    ) {
      return res.status(401).json({
        message: "You can't edit this event because it's in the past",
        succeed: false,
      });
    }

    //if the provided date is in the past, return an error
    if (details.time && details.date) {
      //if the provided date or time isn't valid, return an error
      if (!isValidDate(details.date) || !isValidTime(details.time)) {
        return res.status(401).json({
          message: "Please enter a valid date and time",
          succeed: false,
        });
      }
      //if the provided date or time is in the past, return an error
      if (
        compareDates(details.date, "<", getCurrentDate()) ||
        (compareDates(details.date, "=", getCurrentDate()) &&
          compareTimes(details.time, "<", getCurrentTime()))
      ) {
        return res.status(401).json({
          message: "You can't edit this event with a date in the past",
          succeed: false,
        });
      }
    } else if (details.time) {
      //if the provided time isn't valid, return an error
      if (!isValidTime(details.time)) {
        return res.status(401).json({
          message: "Please enter a valid time",
          succeed: false,
        });
      }
      //if the provided time is in the past, return an error
      if (
        compareDates(resultsDate, "=", getCurrentDate()) &&
        compareTimes(details.time, "<", getCurrentTime())
      ) {
        return res.status(401).json({
          message: "You can't edit this event with a time in the past",
          succeed: false,
        });
      }
    } else if (details.date) {
      //if the provided date isn't valid, return an error
      if (!isValidDate(details.date)) {
        return res.status(401).json({
          message: "Please enter a valid date",
          succeed: false,
        });
      }
      //if the provided date is in the past, return an error
      if (compareDates(details.date, "<", getCurrentDate())) {
        return res.status(401).json({
          message: "You can't edit this event with a date in the past",
          succeed: false,
        });
      }
    }
    //Creating the update array
    const [arrayField, arrayContent] = await arrayToSet(details);
    console.log(arrayField, arrayContent);

    //if there is no field to update, return an error
    if (arrayField.length === 0) {
      return res.status(400).json({
        message: "Please enter at least one field to update",
        succeed: false,
      });
    }

    //if the waiters amount is less than the approved waiters, update the requests
    if (details.waiters_amount) {
      //if the waiters amount is less than 1, return an error
      if (details.waiters_amount < 1) {
        return res.status(400).json({
          message: "Please enter a valid number of waiters",
          succeed: false,
        });
      }
      //if the waiters amount is less than the approved waiters, update the requests
      if (details.waiters_amount < results[0][0].approved_waiters) {
        let waiters_id = await pool.query(
          `SELECT waiter_id FROM requests WHERE event_id = ? AND status = 'Approved' ORDER BY id DESC;`,
          [details.event_id]
        );
        //extracting the waiters id
        waiters_id = waiters_id[0].map((row) => row.waiter_id);
        //getting the number of waiters to reject
        const numToReject =
          results[0][0].approved_waiters - details.waiters_amount;

        //cutting the waiters id
        waiters_id = waiters_id.slice(0, numToReject);

        //getting the waiters details
        let waiters = await pool.query(
          `SELECT CONCAT(first_name,' ',last_name) AS name ,email FROM waiters WHERE id IN (?);`,
          [waiters_id]
        );

        //updating the waiters array
        waiters = waiters[0].map((row) => {
          return { name: row.name, email: row.email };
        });
        //updating the waiters array
        await pool.query(
          `UPDATE requests SET status = 'Rejected' WHERE waiter_id IN (?) AND event_id = ?`,
          [waiters_id, details.event_id]
        );

        waiters = waiters.map((waiter) => {
          let message = `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 400px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;" dir="rtl" lang="he">
  <h2 style="color: #d9534f; text-align: center;">הודעה חשובה</h2>
  <p>הי <strong>${waiter.name}</strong>,</p>
  <p>בוטלת מעבודה שאושרת אליה:</p>
  <ul style="list-style: none; padding: 0;">
    <li><strong>תאריך:</strong> ${cutIsoDate(results[0][0].e_date)}</li>
    <li><strong>שעה:</strong> ${results[0][0].e_time}</li>
    <li><strong>מיקום:</strong> ${results[0][0].location}</li>
  </ul>
  <p>אנו מאחלים לך <strong>המשך יום נעים</strong>.</p>
</div>
`;

          sendMail(waiter.email, ` בוטלת מעבודה שאושרת אליה`, false, message);
        });
      }
    }
    //Creating the update query
    const updateQuery = `
      UPDATE events 
      SET ${arrayField.map((field) => `${field} = ?`).join(", ")} 
      WHERE id = ? AND company_id = ?;
    `;
    //Updating the event
    await pool.query(updateQuery, [...arrayContent, details.event_id, user.id]);
    //Sending the response
    return res.status(200).json({
      message: "Updated successfully",
      succeed: true,
    });
  } catch (err) {
    //If there is an error, return an error
    console.error(err);

    return res.status(500).json({
      message: "Error fetching data" + " => " + err.sqlMessage,
      succeed: false,
    });
  }
}

router.put("/update-event", authenticateToken, updateEvent);

// router.put("/update-event", authenticateToken, (req, res) => {
//   const userEmail = req.header("email");
//   const event = req.body;
//   const [arrayField, arrayContent] = arrayToSet(event);
//   // console.log("event: ", event);

//   sqlQuerySelect(
//     "id",
//     "companies",
//     ["email"],
//     "=",
//     [userEmail],
//     0,
//     (err, results) => {
//       if (err) {
//         res.status(500).json({
//           message: "Error finding employer ID inside database",
//           succeed: false,
//         });
//       } else {
//         sqlQueryUpdate(
//           "events",
//           arrayField,
//           arrayContent,
//           ["id", "company_id"],
//           "=",
//           [event.event_id, results[0].id],
//           (err, results) => {
//             if (err) {
//               res.status(500).json({
//                 message: "Error during updating event",
//                 succeed: false,
//               });
//             } else {
//               res.status(200).json({
//                 message: "Event updated successfully",
//                 succeed: true,
//               });
//             }
//           }
//         );
//       }
//     }
//   );
// });

export default router;

function arrayToSet(event) {
  let arrayField = [];
  let arrayContent = [];

  if (event.date) {
    arrayField.push("e_date");
    arrayContent.push(event.date);
  }
  if (event.time) {
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
  if (event.status === "Active" || event.status === "Canceled") {
    arrayField.push("status");
    arrayContent.push(event.status);
  }
  // console.log("arrayField: ", arrayField);
  // console.log("arrayContent: ", arrayContent);

  return [arrayField, arrayContent];
}
