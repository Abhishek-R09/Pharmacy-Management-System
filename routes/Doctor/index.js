const express = require('express');
const router = express.Router();
const doctorRouteControllers = require('../../controllers/Doctor');

router.get('/doctors', doctorRouteControllers.getAllDoctors);

router.post('/addDoctor', doctorRouteControllers.addNewDoctor);

module.exports = router;
