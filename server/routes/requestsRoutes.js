import express from "express";
import dotenv from "dotenv";
import { pool } from "../connection.js";
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
import e from "express";
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
      res.status(500).json({ message: "Invalid status", succeed: false });
    }
    let results = await pool.query(
      `SELECT * FROM events WHERE id = ? AND company_id = ?`,
      [req.params.event_id, user.id]
    );
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
      console.log("results: ", results);

      if (results[0].length === 0) {
        res.status(200).json({ message: "Requests", succeed: true, data: [] });
      } else {
        res
          .status(200)
          .json({ message: "Requests", succeed: true, data: results[0] });
      }
    }
  } catch {
    res.status(500).json({
      message: "Error fetching data from the database",
      succeed: false,
    });
  }
}
router.get("/get-requests/:status/:event_id", authenticateToken, getRequests);

//new request - waiter
async function newRequest(req, res) {
  const user = await extractingUserDetails(req.headers["authorization"]);
  const userEmail = req.header("email");
  // const isAwaiter = req.header("isAwaiter") === "true";
  const isAwaiter = user.isAwaiter;
  const request = req.body;
  // console.log("request: ", request);

  if (!(userEmail && request.event_id)) {
    return res.status(401).send({ message: "Unauthorized", succeed: false });
  }
  if (!isAwaiter) {
    return res.status(401).send({
      message: "You are not allowed to delete this event",
      succeed: false,
    });
  }

  try {
    let connection;
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const waiter_id = user.id;

    let results_request_id = await connection.query(
      `SELECT id FROM requests WHERE waiter_id = ? AND event_id = ? LIMIT 1`,
      [waiter_id, request.event_id]
    );
    results_request_id = results_request_id[0][0];
    if (results_request_id.length > 0) {
      res.status(200).json({
        message: "You have already made a request for this event",
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
    connection.release();
  }
}

router.post("/new-request", authenticateToken, newRequest);
//cancel request - waiter
async function cancelRequest(req, res) {
  const user = await extractingUserDetails(req.headers["authorization"]);
  const userEmail = req.header("email");
  const isAwaiter = user.isAwaiter;
  const request = req.body;

  if (!(userEmail && request.event_id)) {
    return res.status(401).send({ message: "Unauthorized", succeed: false });
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
    res.status(200).json({ message: "Request canceled", succeed: true });
  } catch {
    res
      .status(500)
      .json({ message: "Error canceling request", succeed: false });
  }
}
router.delete("/cancel-request", authenticateToken, cancelRequest);
export default router;
