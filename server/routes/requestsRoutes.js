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
} from "../sources/function.js";
import e from "express";
dotenv.config();
const router = express.Router();

async function newRequest(req, res) {
  const userEmail = req.header("email");
  const isAwaiter = req.header("isAwaiter") === "true";
  const request = req.body;
  console.log("request: ", request);

  if (!(userEmail && request.event_id)) {
    return res.status(401).send({ message: "Unauthorized", succeed: false });
  }
  if (!isAwaiter || !userToken) {
    return res.status(401).send({
      message: "You are not allowed to delete this event",
      succeed: false,
    });
  }

  try {
    let connection;
    connection = await pool.getConnection();
    await connection.beginTransaction();

    let waiter_id = await connection.query(
      `SELECT id FROM waiters WHERE email = ? LIMIT 1`,
      [userEmail]
    );

    waiter_id = waiter_id[0][0].id;

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

export default router;
