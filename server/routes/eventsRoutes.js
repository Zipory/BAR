import { Router } from "express";
import mysql from "mysql2";

import express from "express";
import { connection } from "../connection.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("hello");
});

export default router;
