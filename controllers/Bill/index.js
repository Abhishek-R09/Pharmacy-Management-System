const billQueries = require('../../db/Bill');

const initialData = async (req, res) => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  try {
    const medAndStock = await billQueries.getMedicinesAndStocks();
    const patAndDoc = await billQueries.getPatientAndDoctor();
    const currBillNo = await billQueries.getCurrentBillNo();
    // console.log(currBillNo);
    res.render('Bill/index.ejs', {
      user: req.user,
      medAndStock,
      patAndDoc,
      currBillNo,
      today: today,
    });
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

const generateBill = async (req, res) => {
  const patientId = req.body.patId;
  const billDate = req.body.billDate;
  const paymentMode = req.body.paymentMode;
  const discount = req.body.discount;
  const finalCost = req.body.finalTotalCost;
  const medIds = [];
  const medQuantity = [];
  const medStockIds = [];
  let i = 0;
  while (req.body['medId' + i]) {
    medIds.push(req.body['medId' + i]);
    medQuantity.push(req.body['medQuantity' + i]);
    medStockIds.push(req.body['medStockId' + i]);
    ++i;
  }
  try {
    const addBillResult = await billQueries.addNewBill({
      patientId,
      billDate,
      paymentMode,
      discount,
      finalCost,
      medIds,
      medQuantity,
      medStockIds,
    });
    console.log(addBillResult);
    res.redirect('/invoiceHistory');
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

module.exports = {
  initialData,
  generateBill,
};
