const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/isAuthenticated');
const homeRouter = require('./Home');
const manageUsersRouter = require('./ManageUsers');
const billRouter = require('./Bill');

router.use(isLoggedIn);

router.use('/', homeRouter);
router.use('/', manageUsersRouter);
router.use('/', billRouter);

module.exports = router;
