const express = require('express');
const router = express.Router();
const manageUsersRouteControllers = require('../../controllers/ManageUsers');

router.get('/', manageUsersRouteControllers.getEmployees);

router.post('/addUser', manageUsersRouteControllers.addEmployee);

router.post('/deleteEmployee', manageUsersRouteControllers.removeEmployee);

module.exports = router;
