const mysql = require("mysql");

//MySQL details
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root@123456",
  database: "todo",
  multipleStatements: true,
});

dbConn.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!");
});

module.exports = dbConn;
