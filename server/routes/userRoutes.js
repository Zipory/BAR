import express from "express";
import dotenv from "dotenv";
import { pool } from "../connection.js";
import { sendMail } from "../Gmail sender/send.js";
import {
  authenticateToken,
  extractingUserDetails,
  cutIsoDate,
} from "../sources/function.js";
dotenv.config();
const router = express.Router();
//get user info
async function getUser(req, res) {
  console.log("here");

  try {
    const user = await extractingUserDetails(req.headers["authorization"]);
    if (!user)
      return res
        .status(401)
        .json({ message: "Access denied", succeed: false, data: {} });
    let results = await pool.query(
      `SELECT * FROM ${user.isAwaiter ? "waiters" : "companies"} WHERE id = ?`,
      [user.id]
    );

    results = results[0][0];
    delete results[user.isAwaiter ? "w_password" : "e_password"];
    if (user.isAwaiter) {
      results.birthday = cutIsoDate(results.birthday);
    }
    return res
      .status(200)
      .json({ message: "User details", succeed: true, data: results });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ message: "Something went wrong", succeed: false, data: [] });
  }
}

router.get("/info", authenticateToken, getUser);

async function companyDetails(req, res) {
  try {
    const companyID = req.params.companyID;
    if (typeof Number(companyID) !== "number") {
      return res.status(400).json({
        message: "Please enter a valid company ID",
        succeed: false,
        data: {},
      });
    }
    let results = await pool.query(
      `SELECT * FROM companies WHERE id = ? LIMIT 1;`,
      [companyID]
    );

    if (results[0].length === 0) {
      return res.status(400).json({
        message: "There is no company with this ID",
        succeed: false,
        data: {},
      });
    }
    results = results[0][0];
    delete results.e_password;
    return res.status(200).json({
      message: "Company details",
      succeed: true,
      data: results,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, succeed: false, data: [] });
  }
}

router.get("/company-details/:companyID", authenticateToken, companyDetails);

export default router;
