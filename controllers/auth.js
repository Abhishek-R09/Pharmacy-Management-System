const loginPage = (req, res) => {
  res.render('login.ejs', { message: req.flash('loginMessage') });
};

const signupPage = (req, res) => {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
};

const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/login');
};

module.exports = {
  loginPage,
  signupPage,
  logout,
};
