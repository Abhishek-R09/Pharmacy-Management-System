const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.get('/signup', (req, res) => {
  res.render('signup.ejs', { message: req.flash('loginMessage') });
});

module.exports = router;
