const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gm_advocates_db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed: " + err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

module.exports = db;
