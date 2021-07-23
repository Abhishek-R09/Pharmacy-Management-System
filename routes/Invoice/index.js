const express = require('express');
const router = express.Router();
const invoiceRouteController = require('../../controllers/Invoice');

router.get('/', invoiceRouteController.allInvoices);

router.get('/billNo:billId', invoiceRouteController.getBill);

module.exports = router;
