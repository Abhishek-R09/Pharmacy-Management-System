require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');

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
app.set('view engine', 'ejs');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', require('./routes/auth')(passport));
const protectedRoutes = require('./routes/protected');
app.use('/', protectedRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
