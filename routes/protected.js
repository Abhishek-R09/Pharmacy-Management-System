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
router.use('/manageUsers', manageUsersRouter);
router.use('/newBill', billRouter);
router.use('/patients', patientRouter);
router.use('/doctors', doctorRouter);
router.use('/inventory', inventoryRoute);
router.use('/invoiceHistory', invoicesRoute);

module.exports = router;
