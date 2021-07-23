const invoiceQueries = require('../../db/Invoice');

const allInvoices = async (req, res) => {
  try {
    const allBills = await invoiceQueries.getBillMini();
    res.render('invoice_history.ejs', { user: req.user, rows: allBills.data });
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

const getBill = async (req, res) => {
  const billId = req.params.billId;
  try {
    const billDetails = await invoiceQueries.getBillByBillID(billId);
    res.render('billDetails.ejs', { user: req.user, rows: billDetails.data });
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

module.exports = { allInvoices, getBill };
