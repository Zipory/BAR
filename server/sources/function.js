import { connection } from "../connection.js";
import jwt from "jsonwebtoken";

function getCurrentDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

//returns current time in "string"
function getCurrentTime() {
  const date = new Date();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
function cutIsoDate(e_date) {
  if (e_date instanceof Date) {
    const year = e_date.getFullYear();
    const month = String(e_date.getMonth() + 1).padStart(2, "0");
    const day = String(e_date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } else {
    console.warn("Warning: e_date is not a Date object. Value:", e_date);
    e_date = String(e_date);
    return e_date.slice(0, 10);
  }
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**-----------------SQL Query functions------------------ */

//to use this function you must put this arguments:
// table name "string" - required
// fields [array] - required
// values [array] - required
// callback function- required
//returns results of sql query in [{},{}...]

function sqlQueryInsert(table, fields = [], values = [], callback) {
  const placeholders = fields.map(() => "?").join(", ");
  const sql = `INSERT INTO ${table} (${fields.join(
    ", "
  )}) VALUES (${placeholders})`;

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      callback(err, null); // Call the callback with an error
    } else {
      callback(null, results); // Call the callback with results
    }
  });
}

//to use this function you must put this arguments:
// what do you want to select "string" - required
// from which table "string" - required
// where condition [array] - optional => but put an empty array []
// condition "string" - required
// compar condition [array] - optional => but put an empty array []
// limit number "number" - optional => but put 0
// callback function - required
function sqlQuerySelect(
  selectWhat,
  fromWhat,
  whereCondition = [],
  conditionChar = "=",
  comparCondition = [],
  limitNum = 0,
  callback
) {
  let sql = `SELECT ${selectWhat} FROM ${fromWhat}`;

  // Adding WHERE conditions if provided
  if (whereCondition.length > 0) {
    sql += " WHERE ";
    sql += whereCondition
      .map((condition) => `${condition} ${conditionChar} ?`)
      .join(" AND ");
  }

  // Adding LIMIT clause if specified
  if (Number(limitNum) > 0) {
    sql += ` LIMIT ${limitNum}`;
  }
  console.log("sql query: ", sql);

  // Executing the query
  connection.query(sql, comparCondition, (err, results) => {
    if (err) {
      console.error(316, "Error fetching data:", err);
      callback(err, null); // Call the callback with an error
    } else {
      callback(null, results); // Call the callback with results
    }
  });
}

function sqlQueryDelete(
  tableName,
  whereCondition = [],
  conditionChar = "=",
  comparCondition = [],
  callback
) {
  let sql = `DELETE FROM ${tableName} WHERE `;

  // Adding WHERE conditions if provided
  if (whereCondition.length > 0) {
    sql += whereCondition
      .map((condition) => `${condition} ${conditionChar} ?`)
      .join(" AND ");
  }

  // Executing the query
  connection.query(sql, comparCondition, (err, results) => {
    if (err) {
      console.error(316, "Error deleting data:", err);
      callback(err, null); // Call the callback with an error
    } else {
      // console.log(results);
      callback(null, results); // Call the callback with results
    }
  });
}
//new update function. maybe its not done yet
function sqlQueryUpdate(
  tableName,
  setFields = [],
  newContents = [],
  whereConditions = [],
  charCondition = "=",
  comparCondition = [],
  callback
) {
  // const setFieldsString = setFields.map((field) => `${field} = ?`).join(", ");
  // console.log("setFieldsString: ", setFieldsString);
  // let combinedArray = setFields.map(
  //   (item, index) => `${item} ${charCondition} ?`
  // );

  let sql = `UPDATE ${tableName} SET ${setFields
    .map((item) => `${item} ${charCondition} ?`)
    .join(", ")} `;

  // console.log("sql query123: ", sql);

  //
  if (whereConditions.length > 0) {
    sql += `WHERE ${whereConditions
      .map((condition) => `${condition} ${charCondition} ?`)
      .join(" AND ")};`;
  }
  console.log("sql query: ", sql);
  console.log("comparCondition: ", comparCondition);
  console.log("newContents: ", newContents);

  connection.query(
    sql,
    [...newContents, ...comparCondition],
    (err, results) => {
      if (err) {
        console.error(316, "Error updating data:", err);
        callback(err, null); // Call the callback with an error
      } else {
        callback(null, results); // Call the callback with results
      }
    }
  );
}
/**-----------------JWT functions------------------ */
//generate token
function generateToken(user) {
  console.log("user details: ", user);

  return jwt.sign(
    { id: user.id, isAwaiter: user.isAwaiter, name: user.name },
    process.env.SECRET_KEY,
    { expiresIn: "30d" }
  );
}
//authenticate token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).json({ message: "Access denied", succeed: false });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid token", succeed: false });
    // console.log("user in token: ", user);

    req.user = user;
    next();
  });
}
async function extractingUserDetails(token) {
  let userDe;
  await jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    // console.log("user in function : ", user);
    userDe = user;
  });

  return userDe;
}
/**-----------------export functions---------------- */
export {
  getCurrentDate,
  getCurrentTime,
  cutIsoDate,
  sqlQueryInsert,
  sqlQuerySelect,
  sqlQueryDelete,
  sqlQueryUpdate,
  capitalizeFirstLetter,
  generateToken,
  authenticateToken,
  extractingUserDetails,
};
