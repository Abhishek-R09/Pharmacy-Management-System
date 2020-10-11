require("dotenv").config()
const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const ejs = require("ejs");
const mysql = require("mysql");
const passport = require('passport');
const flash = require('connect-flash');
const app = express();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, /*Your Password */
  database: process.env.DB_NAME /* Database Name */
});


connection.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected!");
});

// con.query("SELECT * FROM login", function (err, result) {
//   if (err) throw err;
//   if (result.length > 0) {
//     console.log(result[0].password);
//   } else {
//     console.log("No results");
//   }
// });

// app.use(morgan('dev')); // log every request to the console
// app.use(cookieParser()); // read cookies (needed for auth)
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// required for passport
// app.use(session({
//   secret: 'vidyapathaisalwaysrunning',
//   resave: true,
//   saveUninitialized: true
// })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// require('./config/passport')(passport); // pass passport for configuration
// routes ======================================================================
// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.get("/", function (req, res) {
  res.render("sign_up", {});
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  connection.query("SELECT * FROM login WHERE username = ?", [username], function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      if (rows.length === 0) {
        console.log("Not found");
      } else {
        if (password === rows[0].password) {
          res.render("index");
        }
      }
    }
  });
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
