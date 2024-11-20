import express from "express";
import dotenv from "dotenv";
import { pool } from "../connection.js";
import {
  extractingUserDetails,
  authenticateToken,
} from "../sources/function.js";
dotenv.config();
const router = express.Router();

//TODO: implement rating routes for waiters and employers

router.post("/new-rating", authenticateToken, async (req, res) => {
  return res.status(200).json({
    message: "You discovered a new fitcher that will added soon",
    succeed: true,
  });
});

export default router;
