import { connection } from "../connection.js";

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
/**-----------------SQL Query functions------------------ */
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
      // console.log(results);
      callback(null, results); // Call the callback with results
    }
  });
}
/**-----------------export functions---------------- */
export {
  getCurrentDate,
  getCurrentTime,
  cutIsoDate,
  sqlQueryInsert,
  sqlQuerySelect,
};
