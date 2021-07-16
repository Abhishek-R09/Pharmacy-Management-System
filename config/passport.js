const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const connection = require('../db/connect');
const { getUserFromUsername, addNewUser } = require('../db/Auth');

const passportAuthentication = (passport) => {
  /* 
    passport session setup
    required for persistent login sessions
    passport needs ability to serialize and deserialize users out of session 
  */

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    connection.query(
      'SELECT * FROM login WHERE id = ? ',
      [id],
      function (err, rows) {
        done(err, rows[0]);
      }
    );
  });

  /*
   LOCAL SIGNUP
   we are using named strategies since we have one for login and one for signup
   by default, if there was no name, it would just be called 'local'
  */

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      async (req, username, password, done) => {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        let users;
        try {
          users = await getUserFromUsername(username);
        } catch (err) {
          err;
          return done(err);
        }

        if (users.length) {
          // req.flash is the way to set flashdata using connect-flash
          return done(
            null,
            false,
            req.flash('signupMessage', 'That username is already taken.')
          );
        }

        // if there is no user with that username
        // create the user
        try {
          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(password, salt);
          const newUserDetails = {
            username: username,
            password: passwordHash,
          };

          let newUserId = await addNewUser(
            newUserDetails.username,
            newUserDetails.password,
            'Admin'
          );
          newUserDetails.id = newUserId;

          return done(null, newUserDetails);
        } catch (error) {
          error;
          return done(
            null,
            false,
            req.flash('signupMessage', 'Something went wrong!')
          );
        }
      }
    )
  );

  /*
   LOCAL LOGIN
   we are using named strategies since we have one for login and one for signup
   by default, if there was no name, it would just be called 'local'
*/
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      async (req, username, password, done) => {
        // callback with email and password from our form
        let user;
        try {
          user = await getUserFromUsername(username);
        } catch (err) {
          err;
          return done(err);
        }
        if (!user.length) {
          ('Passport.js login username not found!');
          // req.flash is the way to set flashdata using connect-flash
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
        try {
          ('Passport.js login verify password!');
          const passwordCorrect = await bcrypt.compare(
            password,
            user[0].password
          );
          if (passwordCorrect) {
            // all is well, return successful user
            ('Passport.js login correct password!');
            return done(null, user[0]);
          } else {
            return done(
              null,
              false,
              // create the loginMessage and save it to session as flashdata
              req.flash('loginMessage', 'Oops! Wrong password.')
            );
          }
        } catch (err) {
          // if the user is found but the password is wrong
          return done(
            null,
            false,
            // create the loginMessage and save it to session as flashdata
            req.flash('loginMessage', 'Something went wrong!')
          );
        }
      }
    )
  );
};

module.exports = passportAuthentication;
