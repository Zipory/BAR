import express from "express";
import dotenv from "dotenv";
import { pool } from "../connection.js";
import { sendMail } from "../Gmail sender/send.js";
import {
  getCurrentDate,
  getCurrentTime,
  cutIsoDate,
  sqlQueryInsert,
  sqlQuerySelect,
  sqlQueryDelete,
  sqlQueryUpdate,
  capitalizeFirstLetter,
  authenticateToken,
  extractingUserDetails,
} from "../sources/function.js";
import { waiter_Fields_Select } from "../sources/variables.js";
dotenv.config();
const router = express.Router();
/** -----------------get requests by status and event id---------------- */
//get requests - company
async function getRequests(req, res) {
  //trying to make sure that the user is who they say they are
  try {
    const user = await extractingUserDetails(req.headers["authorization"]);
    const status = capitalizeFirstLetter(req.params.status);
    //if the status is not pending or approved, return an error
    if (status !== "Pending" && status !== "Approved") {
      return res
        .status(500)
        .json({ message: "Invalid status", succeed: false });
    }
    //if the user is not a company, return an error
    let results = await pool.query(
      `SELECT * FROM events WHERE id = ? AND company_id = ?`,
      [req.params.event_id, user.id]
    );
    //if the event does not exist, return an error
    if (results[0].length === 0) {
      return res.status(401).json({
        message: "You are not allowed to see this event",
        succeed: false,
      });
    } else {
      results = await pool.query(
        `SELECT waiter_id FROM requests WHERE event_id = ? AND status =?`,
        [req.params.event_id, status]
      );
      //if there are no requests, return an empty array
      if (results[0].length === 0) {
        return res.status(200).json({
          message: "Requests fetched successfully - There are no requests",
          succeed: true,
          data: [],
        });
      }
      //add waiters details
      const waiter_ids = results[0].map((request) => request.waiter_id);
      const waiter_fields = waiter_Fields_Select.join(",");
      results = await pool.query(
        `SELECT ${waiter_fields} FROM waiters WHERE id IN (${waiter_ids.join(
          ","
        )})`
      );
      //return the requests
      //cut the ISO birthday
      let resultsArray = [...results[0]];
      resultsArray.map((waiter) => {
        waiter.birthday = cutIsoDate(waiter.birthday);
      });
      return res.status(200).json({
        message: "Requests fetched successfully",
        succeed: true,
        data: results[0],
      });
    }
  } catch {
    res.status(500).json({
      message: "Error fetching data from the database",
      succeed: false,
    });
  }
}
router.get("/get-requests/:status/:event_id", authenticateToken, getRequests);

/** -----------------Aprove request---------------- */
//approve request - company
async function approveRequest(req, res) {
  try {
    const user = await extractingUserDetails(req.headers["authorization"]);
    const request = req.body;
    //if the user is not a company, return an error
    if (user.isAwaiter) {
      return res.status(401).send({
        message: "You are not allowed to approve this request",
        succeed: false,
      });
    }
    //if the user didn't provide waiter_id or event_id, return an error
    if (!request.waiter_id || !request.event_id) {
      return res.status(400).send({
        message: "Please provide waiter_id and event_id",
        succeed: false,
      });
    }
    //check if the event exists
    let results = await pool.query(
      `SELECT id,e_date,e_time,location,event_description from events WHERE id = ? AND company_id = ?`,
      [request.event_id, user.id]
    );

    //if the event does not exist, return an error
    if (results[0].length === 0) {
      return res.status(401).send({
        message: "You are not allowed to approve this request",
        succeed: false,
      });
    }
    //takes the details of the event for the email message
    const eventDate = cutIsoDate(results[0][0].e_date);
    const eventTime = results[0][0].e_time;
    const eventLocation = results[0][0].location;
    const eventDescription = results[0][0].event_description;
    //check if the event has reached its limit
    results = await pool.query(
      `SELECT waiters_amount,approved_waiters FROM events WHERE id = ? AND company_id = ?`,
      [request.event_id, user.id]
    );
    //if the event has reached its limit, return an error
    if (results[0][0].waiters_amount === results[0][0].approved_waiters) {
      return res.status(409).send({
        message: "All waiters have already been approved for this event",
        succeed: false,
      });
    }
    //check if the waiter has already been approved or rejected
    results = await pool.query(
      `SELECT id,status FROM requests WHERE waiter_id = ? AND event_id = ? AND (status = 'Approved' OR status = 'Rejected')`,
      [request.waiter_id, request.event_id]
    );
    //if the waiter has already been approved or rejected, return an error
    if (results[0].length !== 0) {
      return res.status(409).send({
        message: `This waiter has already been ${results[0][0].status} for this event`,
        succeed: false,
      });
    }
    //approve the request
    pool.query(
      `UPDATE requests SET status = 'Approved' WHERE waiter_id = ? AND event_id = ?`,
      [request.waiter_id, request.event_id]
    );
    res.status(200).json({ message: "Request approved", succeed: true });
    let waiter_email_details = await pool.query(
      `SELECT email,CONCAT(first_name,' ',last_name) as name FROM waiters WHERE id = ?`,
      [request.waiter_id]
    );
    //send an email to the waiter
    //     let message = `
    // שלום ${waiter_email_details[0][0].name}
    // צוות בר שמח לבשר לך כי אושרת לעבודה
    // בתאריך : ${eventDate}
    // בשעה : ${eventTime}
    // בכתובת : ${eventLocation}
    // אירוע : ${eventDescription}
    // בהצלחה
    // `;
    let message = `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 400px; margin: 0 auto; padding: 20px; background-color: #f0f9f0; border: 1px solid #cce5cc; border-radius: 8px;" dir="rtl" lang="he">
  <h2 style="color: #28a745; text-align: center;">בשורות משמחות!</h2>
  <p>שלום <strong>${waiter_email_details[0][0].name}</strong>,</p>
  <p>צוות בר שמח לבשר לך כי <strong>אושרת לעבודה</strong>:</p>
  <ul style="list-style: none; padding: 0;">
    <li><strong>תאריך:</strong> ${eventDate}</li>
    <li><strong>שעה:</strong> ${eventTime}</li>
    <li><strong>כתובת:</strong> ${eventLocation}</li>
    <li><strong>אירוע:</strong> ${eventDescription}</li>
  </ul>
  <p style="text-align: center; font-weight: bold; color: #28a745;">בהצלחה!</p>
</div>
`;

    sendMail(
      waiter_email_details[0][0].email,
      "ברכות, אושרת לעבודה",
      false,
      message
    );
  } catch {
    res.status(500).json({
      message: "Error fetching data from the database",
      succeed: false,
    });
  }
}
router.post("/approve-request", authenticateToken, approveRequest);

// reject request - company

async function rejectRequest(req, res) {
  try {
    const user = await extractingUserDetails(req.headers["authorization"]);
    const request = req.body;

    if (user.isAwaiter) {
      return res.status(401).send({
        message: "You are not allowed to reject this request",
        succeed: false,
      });
    }
    if (!request.waiter_id || !request.event_id) {
      return res.status(400).send({
        message: "Please provide waiter_id and event_id",
        succeed: false,
      });
    }
    let results = await pool.query(
      `SELECT id FROM events WHERE id = ? AND company_id = ?`,
      [request.event_id, user.id]
    );
    if (results[0].length === 0) {
      return res.status(401).send({
        message: "You are not allowed to reject this request",
        succeed: false,
      });
    }
    results = await pool.query(
      `SELECT id FROM requests WHERE waiter_id = ? AND event_id = ? AND status = 'Pending'`,
      [request.waiter_id, request.event_id]
    );
    if (results[0].length === 0) {
      return res.status(409).send({
        message: `This waiter has not been Pending for this event`,
        succeed: false,
      });
    }

    pool.query(
      `UPDATE requests SET status = 'Rejected' WHERE waiter_id = ? AND event_id = ?`,
      [request.waiter_id, request.event_id]
    );
    res.status(200).json({ message: "Request rejected", succeed: true });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching data from the database",
      succeed: false,
    });
  }
}

router.post("/reject-request", authenticateToken, rejectRequest);
/**--------------------------new request---------------- */
//new request - waiter
async function newRequest(req, res) {
  const user = await extractingUserDetails(req.headers["authorization"]);
  const isAwaiter = user.isAwaiter;
  const request = req.body;

  if (!request.event_id) {
    return res.status(401).send({ message: "Unauthorized", succeed: false });
  }
  if (!isAwaiter) {
    return res.status(401).send({
      message: "You are not allowed to add requests for this event",
      succeed: false,
    });
  }
  let connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const waiter_id = user.id;

    let results_request_id = await connection.query(
      `SELECT id,status FROM requests WHERE waiter_id = ? AND event_id = ? LIMIT 1`,
      [waiter_id, request.event_id]
    );
    console.log("results_request_id: ", results_request_id);

    results_request_id = results_request_id[0];
    console.log("results_request_id: ", results_request_id);
    console.log(results_request_id.length > 0);

    if (results_request_id.length > 0) {
      return res.status(200).json({
        message: `Your request is already ${results_request_id[0].status}`,
        succeed: false,
      });
    }

    await connection.query(
      `INSERT INTO requests (waiter_id, event_id, status) VALUES (?, ?, ?)`,
      [waiter_id, request.event_id, "Pending"]
    );

    await connection.commit();
    res.status(200).json({ message: "Request created", succeed: true });
  } catch {
    await connection.rollback();
    res.status(500).json({ message: "Error creating request", succeed: false });
  } finally {
    if (connection) connection.release();
  }
}

router.post("/new-request", authenticateToken, newRequest);
/**------------------------cancel request---------------- */
//cancel request - waiter
async function cancelRequest(req, res) {
  const user = await extractingUserDetails(req.headers["authorization"]);
  const isAwaiter = user.isAwaiter;
  const request = req.body;

  if (!request.event_id) {
    return res
      .status(401)
      .send({ message: "Please enter event id", succeed: false });
  }
  if (!isAwaiter) {
    return res.status(401).send({
      message: "You are not allowed to delete this event",
      succeed: false,
    });
  }

  try {
    await pool.query(
      `UPDATE requests SET status = 'Canceled' WHERE waiter_id = ? AND event_id = ?`,
      [user.id, request.event_id]
    );
    return res.status(200).json({ message: "Request canceled", succeed: true });
  } catch {
    res
      .status(500)
      .json({ message: "Error canceling request", succeed: false });
  }
}
router.delete("/cancel-request", authenticateToken, cancelRequest);
export default router;
