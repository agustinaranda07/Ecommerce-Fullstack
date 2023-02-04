const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "43747371",
  database: "ecommerce",
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log("error", err);
    return;
  } else {
    console.log("Database connection successful");
  }
});

module.exports = mysqlConnection;
