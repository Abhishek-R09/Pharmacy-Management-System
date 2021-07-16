// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const connection = require('../db/connect');
const { getUserFromUsername, addNewUser } = require('../controllers/auth');

// expose this function to our app using module.exports
const passportAuthentication = (passport) => {
  /* 
    passport session setup
    required for persistent login sessions
    passport needs ability to serialize and deserialize users out of session 
  */

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    console.log(user);
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

        console.log('config/passport.js local-signup called');
        let users;
        try {
          users = await getUserFromUsername(username);
        } catch (err) {
          console.log(err);
          return done(err);
        }

        if (users.length) {
          console.log('config/passport.js local-signup executed with rows');
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
          console.log(
            'config/passport.js local-signup new user generation started'
          );
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
          console.log();
          console.log(
            'config/passport.js local-signup new user generation completed'
          );

          return done(null, newUserDetails);
        } catch (error) {
          console.log(error);
          return done(
            null,
            false,
            req.flash('signupMessage', 'Something went wrong!')
          );
        }

        // connection.query(
        //   'SELECT * FROM login WHERE username = ?',
        //   [username],
        //   function (err, rows) {
        //     if (err) return done(err);
        //     if (rows.length) {
        //       return done(
        //         null,
        //         false,
        //         req.flash('signupMessage', 'That username is already taken.')
        //       );
        //     } else {
        //       // if there is no user with that username
        //       // create the user
        //       var newUserMysql = {
        //         username: username,
        //         password: bcrypt.hashSync(password, null, null), // use the generateHash function in our user model
        //       };

        //       var insertQuery =
        //         "INSERT INTO login ( username, password, role) values (?,?, 'Admin')";
        //       connection.query(
        //         insertQuery,
        //         [newUserMysql.username, newUserMysql.password],
        //         function (err, rows) {
        //           newUserMysql.id = rows.insertId;

        //           return done(null, newUserMysql);
        //         }
        //       );
        //     }
        //   }
        // );
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
        console.log('config/passport.js local-login called');
        let user;
        try {
          user = await getUserFromUsername(username);
        } catch (err) {
          console.log(err);
          return done(err);
        }

        if (!user.length) {
          console.log('config/passport.js local-login executed with no rows');
          // req.flash is the way to set flashdata using connect-flash
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
        console.log('config/passport.js local-login', user[0]);
        try {
          //   console.log('config/passport.js local-login', user[0].password);
          if (await bcrypt.compare(password, user[0].password)) {
            // all is well, return successful user
            console.log(
              'config/passport.js local-login executed with right user'
            );
            return done(null, user[0]);
          }
        } catch (err) {
          // if the user is found but the password is wrong
          console.log(err);
          console.log(
            'config/passport.js local-login executed with wrong credentials'
          );
          return done(
            null,
            false,
            // create the loginMessage and save it to session as flashdata
            req.flash('loginMessage', 'Oops! Wrong password.')
          );
        }
        // connection.query(
        //   'SELECT * FROM login WHERE username = ?',
        //   [username],
        //   function (err, rows) {
        //     if (err) return done(err);
        //     if (!rows.length) {
        //       console.log(
        //         'config/passport.js local-login executed with no rows'
        //       );
        //       return done(
        //         null,
        //         false,
        //         req.flash('loginMessage', 'No user found.')
        //       ); // req.flash is the way to set flashdata using connect-flash
        //     }

        //     // if the user is found but the password is wrong
        //     if (!bcrypt.compareSync(password, rows[0].password))
        //       return done(
        //         null,
        //         false,
        //         req.flash('loginMessage', 'Oops! Wrong password.')
        //       ); // create the loginMessage and save it to session as flashdata

        //     // all is well, return successful user
        //     return done(null, rows[0]);
        //   }
        // );
      }
    )
  );
};

module.exports = passportAuthentication;
// module.exports = function (passport) {
//   // =========================================================================
//   // passport session setup ==================================================
//   // =========================================================================
//   // required for persistent login sessions
//   // passport needs ability to serialize and unserialize users out of session

//   // used to serialize the user for the session
//   passport.serializeUser(function (user, done) {
//     done(null, user.id);
//   });

//   // used to deserialize the user
//   passport.deserializeUser(function (id, done) {
//     connection.query(
//       'SELECT * FROM login WHERE id = ? ',
//       [id],
//       function (err, rows) {
//         done(err, rows[0]);
//       }
//     );
//   });

//   // =========================================================================
//   // LOCAL SIGNUP ============================================================
//   // =========================================================================
//   // we are using named strategies since we have one for login and one for signup
//   // by default, if there was no name, it would just be called 'local'

//   // passport.use(
//   //     'local-signup',
//   //     new LocalStrategy({
//   //         // by default, local strategy uses username and password, we will override with email
//   //         usernameField: 'username',
//   //         passwordField: 'password',
//   //         passReqToCallback: true // allows us to pass back the entire request to the callback
//   //     },
//   //         function (req, username, password, done) {
//   //             // find a user whose email is the same as the forms email
//   //             // we are checking to see if the user trying to login already exists
//   //             // connection.connect();
//   //             connection.query("SELECT * FROM login WHERE username = ?", [username], function (err, rows) {
//   //                 if (err)
//   //                     return done(err);
//   //                 if (rows.length) {
//   //                     return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
//   //                 } else {
//   //                     // if there is no user with that username
//   //                     // create the user
//   //                     var newUserMysql = {
//   //                         username: username,
//   //                         password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
//   //                     };

//   //                     var insertQuery = "INSERT INTO login ( username, password, role) values (?,?, 'Admin')";
//   //                     // connection.connect();
//   //                     connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], function (err, rows) {
//   //                         newUserMysql.id = rows.insertId;

//   //                         return done(null, newUserMysql);
//   //                     });
//   //                     // connection.end();
//   //                 }
//   //             });
//   //             // connection.end();
//   //         })
//   // );

//   // =========================================================================
//   // LOCAL LOGIN =============================================================
//   // =========================================================================
//   // we are using named strategies since we have one for login and one for signup
//   // by default, if there was no name, it would just be called 'local'

//   passport.use(
//     'local-login',
//     new LocalStrategy(
//       {
//         usernameField: 'username',
//         passwordField: 'password',
//         passReqToCallback: true, // allows us to pass back the entire request to the callback
//       },
//       function (req, username, password, done) {
//         // callback with email and password from our form
//         // connection.connect();
//         console.log('config/passport.js called');
//         connection.query(
//           'SELECT * FROM login WHERE username = ?',
//           [username],
//           function (err, rows) {
//             if (err) return done(err);
//             if (!rows.length) {
//               console.log(
//                 'config/passport.js local-login executed with no rows'
//               );
//               return done(
//                 null,
//                 false,
//                 req.flash('loginMessage', 'No user found.')
//               ); // req.flash is the way to set flashdata using connect-flash
//             }

//             // if the user is found but the password is wrong
//             if (!bcrypt.compareSync(password, rows[0].password))
//               return done(
//                 null,
//                 false,
//                 req.flash('loginMessage', 'Oops! Wrong password.')
//               ); // create the loginMessage and save it to session as flashdata

//             // all is well, return successful user
//             return done(null, rows[0]);
//           }
//         );
//         // connection.end();
//       }
//     )
//   );
// };
