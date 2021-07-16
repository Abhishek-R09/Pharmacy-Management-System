const express = require('express');
const homeRouteController = require('../../controllers/homeRouteController');
const router = express.Router();

router.get('/', homeRouteController.retrieveEmployeeDetails);

router.post('/updateDetails', homeRouteController.updateEmployeeDetails);

module.exports = router;
