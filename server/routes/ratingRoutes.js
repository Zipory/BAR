import express from "express";
import dotenv from "dotenv";
import { pool } from "../connection.js";
import {
  getCurrentDate,
  getCurrentTime,
  addHoursToDateAndTime,
  compareDates,
  compareTimes,
  cutIsoDate,
  extractingUserDetails,
  authenticateToken,
} from "../sources/function.js";
dotenv.config();
const router = express.Router();

//TODO: implement rating routes for waiters and employers

async function newRating(req, res) {
  //Try to rate user
  try {
    //extract user details from token
    const user = await extractingUserDetails(req.headers["authorization"]);
    //extract rating from body
    const rating = req.body;
    //check if the user is a waiter
    if (user.isAwaiter) {
      //check if the rating is valid
      if (
        !rating.event_id ||
        !rating.rating ||
        rating.rating < 0 ||
        rating.rating > 5
      ) {
        return res.status(400).json({
          message: "Please provide correct even id and rating ",
          succeed: false,
        });
      }
      //select the request
      let results = await pool.query(
        `SELECT id,status,rating_c FROM requests WHERE waiter_id = ? AND event_id = ?`,
        [user.id, rating.event_id]
      );
      //check if the request exists
      if (results[0].length === 0) {
        return res.status(401).json({
          message: "This request is not found",
          succeed: false,
        });
      }
      //check if the request is already rated
      if (results[0][0].rating_c !== null) {
        return res.status(401).json({
          message: "You have already rated this request",
          succeed: false,
        });
      }
      //check if the waiter can rate the request
      if (results[0][0].status !== "Approved") {
        return res.status(401).json({
          message: "You can't rate this request",
          succeed: false,
        });
      }
      //select the event
      results = await pool.query(
        `SELECT e_date,e_time,e_duration FROM events WHERE id = ?`,
        [rating.event_id]
      );
      //check if the event exists
      if (results[0].length === 0) {
        return res.status(401).json({
          message: "This event is not found",
          succeed: false,
        });
      }
      //get the date and time of the event
      const e_date = cutIsoDate(results[0][0].e_date);
      const e_time = results[0][0].e_time;
      const e_duration = Math.ceil(results[0][0].e_duration);
      const { updatedDate, updatedTime } = addHoursToDateAndTime(
        e_date,
        e_time,
        e_duration
      );
      const date = updatedDate;
      const time = updatedTime;
      //check if the time to rate the request has come

      if (
        !compareDates(date, "<", getCurrentDate()) &&
        !compareDates(date, "=", getCurrentDate()) &&
        time < getCurrentTime()
      ) {
        return res.status(401).json({
          message: "You can't rate this request yet, please try again later",
          succeed: false,
        });
      }
      //update the rating
      results = await pool.query(
        `UPDATE requests SET rating_c = ? WHERE waiter_id = ? AND event_id = ?`,
        [rating.rating, user.id, rating.event_id]
      );
      //return the response
      return res.status(200).json({
        message: "Rating created",
        succeed: true,
      });
    } else {
      //company rating (to rait waiter)
      //check if the rating is valid
      if (
        !rating.event_id ||
        !rating.waiter_id ||
        !rating.rating ||
        rating.rating < 0 ||
        rating.rating > 5
      ) {
        return res.status(400).json({
          message: "Please provide correct waiter_id event_id and rating ",
          succeed: false,
        });
      }
      //select the request
      let results = await pool.query(
        `SELECT id,status,rating_w FROM requests WHERE waiter_id = ? AND event_id = ?`,
        [rating.waiter_id, rating.event_id]
      );
      //check if the request exists
      if (results[0].length === 0) {
        return res.status(401).json({
          message: "This request is not found",
          succeed: false,
        });
      }
      //check if the request is already rated
      if (results[0][0].rating_w !== null) {
        return res.status(401).json({
          message: "You have already rated this request",
          succeed: false,
        });
      }
      //check if the waiter can rate the request
      if (results[0][0].status !== "Approved") {
        return res.status(401).json({
          message: "You can't rate this request",
          succeed: false,
        });
      }
      //select the event
      results = await pool.query(
        `SELECT e_date,e_time,e_duration FROM events WHERE id = ?`,
        [rating.event_id]
      );
      //check if the event exists
      if (results[0].length === 0) {
        return res.status(401).json({
          message: "This event is not found",
          succeed: false,
        });
      }
      //get the date and time of the event
      const e_date = cutIsoDate(results[0][0].e_date);
      const e_time = results[0][0].e_time;
      const e_duration = Math.ceil(results[0][0].e_duration);
      const { updatedDate, updatedTime } = addHoursToDateAndTime(
        e_date,
        e_time,
        e_duration
      );
      const date = updatedDate;
      const time = updatedTime;
      //check if the time to rate the request has come
      if (
        !compareDates(date, "<", getCurrentDate()) &&
        !compareDates(date, "=", getCurrentDate()) &&
        time < getCurrentTime()
      ) {
        return res.status(401).json({
          message: "You can't rate this request yet, please try again later",
          succeed: false,
        });
      }
      //update the rating
      results = await pool.query(
        `UPDATE requests SET rating_w = ? WHERE waiter_id = ? AND event_id = ?`,
        [rating.rating, rating.waiter_id, rating.event_id]
      );
      //return the response
      return res.status(200).json({
        message: "Rating created",
        succeed: true,
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error creating rating", succeed: false });
  }
}

router.post("/new-rating", authenticateToken, newRating);

//check if the user can rate the request
async function isItPossibleToRate(req, res) {
  try {
    //extract user details
    const user = await extractingUserDetails(req.headers["authorization"]);
    const event = req.body;
    //check if the user is an awaiter\
    console.log(user);

    if (user.isAwaiter) {
      if (!Number(event.event_id)) {
        return res.status(400).json({
          message: "Please provide an event_id",
          succeed: false,
        });
      }
      let results = await pool.query(
        `SELECT e_date,e_time,e_duration FROM events WHERE id = ? `,
        [event.event_id]
      );
      if (results[0].length === 0) {
        return res.status(401).json({
          message: "This event is not found",
          succeed: false,
        });
      }
      //get the date and time of the event

      const e_date = cutIsoDate(results[0][0].e_date);
      const e_time = results[0][0].e_time;
      const e_duration = Math.ceil(results[0][0].e_duration);
      const { updatedDate, updatedTime } = addHoursToDateAndTime(
        e_date,
        e_time,
        e_duration
      );

      //check if the time to rate the request has come
      if (
        !compareDates(updatedDate, "<", getCurrentDate()) &&
        !compareDates(updatedDate, "=", getCurrentDate()) &&
        updatedTime < getCurrentTime()
      ) {
        return res.status(401).json({
          message: "You can't rate this request yet, please try again later",
          succeed: false,
        });
      }
      //select the request
      results = await pool.query(
        `SELECT id,status,rating_c FROM requests WHERE waiter_id = ? AND event_id = ? AND status = 'Approved' AND rating_w IS NULL`,
        [user.id, event.event_id]
      );
      if (results[0].length === 0) {
        return res.status(401).json({
          message: "This request is not found",
          succeed: false,
        });
      }

      return res.status(200).json({
        message: "Rating  is possible",
        succeed: true,
      });
    } else {
      if (!Number(event.event_id) || !Number(event.waiter_id)) {
        return res.status(400).json({
          message: "Please provide an event_id AND waiter_id",
        });
      }
      //if the user is a company
      let results = await pool.query(
        `SELECT e_date,e_time,e_duration FROM events WHERE id = ? AND company_id = ?`,
        [event.event_id, user.id]
      );
      if (results[0].length === 0) {
        return res.status(401).json({
          message: "This event is not found",
          succeed: false,
        });
      }
      //get the date and time of the event
      const e_date = cutIsoDate(results[0][0].e_date);
      const e_time = results[0][0].e_time;
      const e_duration = Math.ceil(results[0][0].e_duration);
      const { updatedDate, updatedTime } = addHoursToDateAndTime(
        e_date,
        e_time,
        e_duration
      );
      //check if the time to rate the request has come
      if (
        !compareDates(updatedDate, "<", getCurrentDate()) &&
        !compareDates(updatedDate, "=", getCurrentDate()) &&
        updatedTime < getCurrentTime()
      ) {
        return res.status(401).json({
          message: "You can't rate this request yet, please try again later",
          succeed: false,
        });
      }

      results = await pool.query(
        `SELECT id,status,rating_c FROM requests WHERE event_id = ? AND waiter_id = ? AND status = 'Approved' AND rating_c IS NULL`,
        [event.event_id, event.waiter_id]
      );
      if (results[0].length === 0) {
        return res.status(401).json({
          message: "This request is not found maybe you rate it already ",
          succeed: false,
        });
      }

      return res.status(200).json({
        message: "Rating  is possible",
        succeed: true,
      });
    }
  } catch (err) {
    //return error
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error fetching rating is possible", succeed: false });
  }
}
router.post("/possible-to-rate", authenticateToken, isItPossibleToRate);

export default router;
