const express = require('express');
const authControllers = require('../controllers/auth');
const router = express.Router();

const authRoutes = (passport) => {
  router.get('/login', authControllers.loginPage);

  router.get('/signup', authControllers.signupPage);

  router.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  router.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/home', // redirect to the secure profile section
      failureRedirect: '/signup', // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  router.get('/logout', authControllers.logout);

  return router;
};

module.exports = authRoutes;
