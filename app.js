require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");
const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS, /*Your Password */
  database: process.env.DB_NAME /* Database Name */
});

con.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected!");
});

con.query("SELECT * FROM login", function (err, result) {
  if (err) throw err;
  if (result.length > 0) {
    console.log(result[0].password);
  } else {
    console.log("No results");
  }
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("sign_up", {});
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
})
