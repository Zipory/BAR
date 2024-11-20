import express from "express";
import dotenv from "dotenv";
import { pool } from "../connection.js";

dotenv.config();
const router = express.Router();
