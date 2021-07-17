const express = require('express');
const router = express.Router();
const manageUsersRouteControllers = require('../../controllers/manageUsersRouteController');

router.get('/manageUsers', manageUsersRouteControllers.getEmployees);

router.post('/addUser', manageUsersRouteControllers.addEmployee);

router.post('/deleteEmployee', manageUsersRouteControllers.removeEmployee);

module.exports = router;
