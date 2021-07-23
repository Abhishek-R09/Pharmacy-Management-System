const express = require('express');
const router = express.Router();
const billRouteControllers = require('../../controllers/Bill');

router.get('/createBill', billRouteControllers.initialData);

router.post('/generateBill', billRouteControllers.generateBill);

module.exports = router;
