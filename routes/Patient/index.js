const express = require('express');
const router = express.Router();
const patientRouteControllers = require('../../controllers/patientRouteController');

router.get('/patients', patientRouteControllers.getAllPatients);

router.post('/addPatient', patientRouteControllers.addNewPatient);

module.exports = router;
