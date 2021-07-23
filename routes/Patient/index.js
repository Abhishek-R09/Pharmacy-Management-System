const express = require('express');
const router = express.Router();
const patientRouteControllers = require('../../controllers/Patient');

router.get('/', patientRouteControllers.getAllPatients);

router.post('/addPatient', patientRouteControllers.addNewPatient);

module.exports = router;
