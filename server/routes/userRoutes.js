import express from "express";
import dotenv from "dotenv";
import { pool } from "../connection.js";
import {
  authenticateToken,
  extractingUserDetails,
} from "../sources/function.js";
dotenv.config();
const router = express.Router();
//get user info
async function getUser(req, res) {
  const user = await extractingUserDetails(req.headers["authorization"]);
  if (!user)
    return res
      .status(401)
      .json({ message: "Access denied", succeed: false, data: {} });
  const results = await pool.query(
    `SELECT * FROM ${user.isAwaiter ? "waiters" : "companies"} WHERE id = ?`,
    [user.id]
  );
  res
    .status(200)
    .json({ message: "User details", succeed: true, data: results[0][0] });
}

router.get("/info", authenticateToken, getUser);

//update user
// async function updateUser(req, res) {

// }
// router.put("/update", authenticateToken, updateUser);

export default router;
