const mysql = require("mysql2");
require("dotenv").config();

console.log("DB_HOST: ", process.env.DB_HOST);
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// db.connect((err) => {
//   if (err) {
//     console.log("MySQL not connected...", err);
//     throw err;
//   }
//   console.log("MySQL connected...");
// });

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("MySQL query error...", err);
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { query, db };
