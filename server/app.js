import { sendMail } from "./Gmail sender/send.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { pool } from "./connection.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import requestsRoutes from "./routes/requestsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
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
} from "./sources/function.js";

import { createFaceUrl } from "./cloudinary-management/createFaceUrl.js";
dotenv.config();

const app = express();

/**----------------Variables---------------- */

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
const port = 4000;

/**-----------------login----------------- */
//async Login function

async function loginFunction(req, res) {
  try {
    const user = req.body;
    // console.log("user:", user);
    // console.log(!user.email);

    //check if the user enter email and password
    if (!user.email || !user.password) {
      return res.status(500).json({
        message: "Please enter your email and password",
        succeed: false,
      });
    }
    //check if the user exist
    let results = await pool.query(
      `SELECT * FROM ${
        user.isAwaiter ? "waiters" : "companies"
      } WHERE email = ? AND status = 'active';`,
      [user.email]
    );

    const password = user.isAwaiter
      ? results[0][0].w_password
      : results[0][0].e_password;

    const isPasswordCorrect = await comparePassword(user.password, password);
    if (!isPasswordCorrect) {
      return res.status(500).json({
        message: "The password is incorrect",
        succeed: false,
      });
    }

    if (results[0].length == 0) {
      return res.status(500).json({
        message: "There is no account with this details",
        succeed: false,
      });
    }

    if (!isPasswordCorrect) {
      return res.status(500).json({
        message: "The password is incorrect",
        succeed: false,
      });
    }

    //if the user exist
    if (results[0].length > 0) {
      //generate token
      const name = (await user.isAwaiter)
        ? results[0][0].first_name + "" + results[0][0].last_name
        : results[0][0].company_name;
      const userToken = await generateToken({
        id: results[0][0].id,
        name: name,
        isAwaiter: user.isAwaiter,
      });

      //send response
      let response = await { ...results[0][0], token: userToken };

      return res
        .status(200)
        .send({ message: "Login successful", succeed: true, data: response });
    } else {
      //if the user not exist
      //send response
      return res.status(500).json({
        message: "There is no account with this details",
        succeed: false,
        data: { token: null },
      });
    }
  } catch (err) {
    //if there is an error
    console.log(err);

    return res.status(500).json({
      message: "Error fetching data from the database",
      succeed: false,
      data: { token: null },
    });
  }
}
//login
app.post("/login", loginFunction);

/**-----------------register----------------- */
async function registerFunction(req, res) {
  try {
    const user = req.body;
    if (user.isAwaiter) {
      if (
        !user.first_name ||
        !user.last_name ||
        !user.phone ||
        !user.birthday ||
        !user.email ||
        !user.password ||
        !user.gender
      ) {
        return res.status(500).json({
          message: "Please enter your details",
          succeed: false,
        });
      }

      let results = await pool.query(
        `SELECT * FROM waiters WHERE email = ? OR phone = ?`,
        [user.email, user.phone]
      );
      if (results[0].length > 0) {
        return res.status(500).json({
          message: "There is already an account with this details",
          succeed: false,
        });
      }
      if (user.image) {
        user.faceImage = await createFaceUrl(user.image);
      }
      const hashedPassword = await hashPassword(user.password);
      await pool.query(
        `INSERT INTO waiters (first_name, last_name, phone, birthday, email, w_password, gender, avg_rating, status, face_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          user.first_name,
          user.last_name,
          user.phone,
          user.birthday,
          user.email,
          hashedPassword,
          user.gender,
          0,
          "active",
          user.faceImage,
        ]
      );
      sendMail(
        user.email,
        `ברוך הבא ${user.first_name} ${user.last_name}`,
        false,
        `<div style="text-align: center;" dir="rtl" lang="he">
  <h1 style="text-align: center; color: green">ברוך הבא ${user.first_name} ${user.last_name}</h1>
  <p>תודה שהצטרפת למשפחת המלצרים של BAR</p>
  <p>פרטי ההתחברות שלך הם:</p>
  <p>מייל : ${user.email}</p>
  <p>סיסמה : ${user.password}</p>
  <p>שיהיה לך יום מקסים
  </div>`
      );

      return res.status(200).json({
        message: "Account created successfully",
        succeed: true,
      });
    } else {
      if (
        !user.company_name ||
        !user.manager ||
        !user.manager_phone ||
        !user.email ||
        !user.password ||
        !user.about
      ) {
        return res.status(500).json({
          message: "Please enter your details",
          succeed: false,
        });
      }

      let results = await pool.query(
        `SELECT * FROM companies WHERE email = ? OR manager_phone = ?`,
        [user.email, user.manager_phone]
      );
      if (results[0].length > 0) {
        return res.status(500).json({
          message: "There is already an account with this details",
          succeed: false,
        });
      }
      const hashedPassword = await hashPassword(user.password);

      await pool.query(
        `INSERT INTO companies (company_name, manager, manager_phone, email, e_password, about,avg_rating, status) VALUES (?, ?, ?, ?, ?,?, ?, ?);`,
        [
          user.company_name,
          user.manager,
          user.manager_phone,
          user.email,
          hashedPassword,
          user.about,
          0,
          "active",
        ]
      );

      sendMail(
        user.email,
        `ברוך הבא ${user.company_name}`,
        false,
        `  <div style="text-align: center ;" dir="rtl" lang="he">
          <h1 style="text-align: center; color: green">
            ברוך הבא ${user.company_name}
          </h1>
          <p>שמחים שהצטרפת למשפחת החברות של BAR</p>
          <p>פרטי ההתחברות שלך הם:</p>
          <p>email : ${user.email}</p>
          <p>סיסמה : ${user.password}</p>
          <p>שיהיה לך יום מקסים</p>
        </div>`
      );

      return res.status(200).json({
        message: "Account created successfully",
        succeed: true,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error creating account",
      succeed: false,
    });
  }
}
app.post("/register", registerFunction);

app.use("/events", eventsRoutes);
app.use("/requests", requestsRoutes);
app.use("/user", userRoutes);
app.use("/rating", ratingRoutes);

/**----------------Interval for past events update---------------- */
const timeToInterval = 60 * 5 * 1000;

async function updatePastEvents() {
  try {
    const date = getCurrentDate();
    const time = getCurrentTime();
    const dateAndTime = `${date} ${time}`;
    let results = await pool.query(
      `UPDATE events 
     set status = 'Past'
     WHERE (e_date < '${date}') OR (e_date = '${date}' AND e_time < '${time}') ;`
    );
    // console.log("results", results);
  } catch (err) {
    console.log(err);
  }
}

const interval = setInterval(() => {
  updatePastEvents();
}, timeToInterval);

/*-----------------set listener open on port 4000 ------------------ */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
