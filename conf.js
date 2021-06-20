const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wilhelmine24",
  database: "registration",
});
module.exports = connection;
