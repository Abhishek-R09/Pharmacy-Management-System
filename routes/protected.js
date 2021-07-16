const express = require('express');
const router = express.Router();
// const { employeeDetails } = require('../controllers/homeRouteController');
const { isLoggedIn } = require('../middlewares/isAuthenticated');
const homeRouter = require('./Home');

router.use(isLoggedIn);

router.use('/', homeRouter);

module.exports = router;
