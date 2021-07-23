const express = require('express');
const router = express.Router();
const inventoryRouteControllers = require('../../controllers/Inventory');

router.get('/', inventoryRouteControllers.getInventoryPageDetails);

router.post('/addStock', inventoryRouteControllers.addNewStock);

router.post('/addMedicine', inventoryRouteControllers.addNewMedicine);

module.exports = router;
