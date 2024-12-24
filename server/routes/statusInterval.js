import { pool } from "../connection";
import express from "express";
import dotenv from "dotenv";
import {
  getCurrentDate,
  getCurrentTime,
  cutIsoDate,
  addHoursToDateAndTime,
  compareDates,
  compareTimes,
  isValidDate,
  isValidTime,
  capitalizeFirstLetter,
  //sql functions
  sqlQueryInsert,
  sqlQuerySelect,
  sqlQueryDelete,
  sqlQueryUpdate,
  selectCompanies,

  //jwt functions
  generateToken,
  authenticateToken,
  extractingUserDetails,
  //bcrypt functions
  hashPassword,
  comparePassword,
} from "../sources/function.js";
dotenv.config();

// const router = express.Router();

// export default router;
