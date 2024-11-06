import { Router } from "express";
import mysql from "mysql2";

import express from "express";
import { connection } from "../connection.js";
import dotenv from "dotenv";
import {
  getCurrentDate,
  getCurrentTime,
  cutIsoDate,
  sqlQueryInsert,
  sqlQuerySelect,
} from "../sources/function.js";
dotenv.config();
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("hello");
});
router.post("/new-event", (req, res) => {
  console.log(req.body);
  const NewEvent = req.body;
  const userToken = req.header("Authorization") || true;
  const userEmail = req.header("email");

  const userID = "";
  if (userToken) {
  } else {
    res.status(401).send("Unauthorized");
  }
});

export default router;
