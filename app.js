const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");
const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", /*Your Password */
  database: "" /* Database Name */
});

con.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected!");
});

var ask;


con.query("SELECT name FROM customers WHERE address='Highway 37'", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
  ask = result[0].name;
});


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  // res.render("sign_up", {});

  res.send("<h1>" + ask + "</h1>");
});



app.listen(3000, function () {
  console.log("Server started on port 3000");
})
