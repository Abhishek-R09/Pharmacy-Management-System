require('dotenv').config();
var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.use(express.static('public'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
// load our routes and pass in our app and fully configured passport
require('./routes/routes.js')(app, passport);

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
