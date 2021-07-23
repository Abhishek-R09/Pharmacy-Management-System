const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/isAuthenticated');
const homeRouter = require('./Home');
const manageUsersRouter = require('./ManageUsers');
const billRouter = require('./Bill');
const patientRouter = require('./Patient');
const doctorRouter = require('./Doctor');
const inventoryRoute = require('./Inventory');
const invoicesRoute = require('./Invoice');

router.use(isLoggedIn);

router.use('/', homeRouter);
router.use('/', manageUsersRouter);
router.use('/', billRouter);
router.use('/', patientRouter);
router.use('/', doctorRouter);
router.use('/', inventoryRoute);
router.use('/', invoicesRoute);

module.exports = router;
