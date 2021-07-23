const inventoryQueries = require('../../db/Inventory');

const getInventoryPageDetails = async (req, res) => {
  try {
    const result = await inventoryQueries.medicineAndStockDetails();
    res.render('Inventory/index.ejs', {
      user: req.user,
      medicines: result.data.medicines,
      stocks: result.data.stocks,
      employees: result.data.employees,
      drugManufacturers: result.data.drugManufacturers,
    });
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

const addNewStock = async (req, res) => {
  const medId = req.body.med_id;
  const expiryDate = req.body.expiry_date;
  const totalStock = req.body.total_stock;
  const associatedEmpId = req.body.associated_emp_id;
  try {
    const result = await inventoryQueries.newStock({
      medId,
      expiryDate,
      totalStock,
      associatedEmpId,
    });
    console.log(result);
    res.redirect('/inventory');
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

const addNewMedicine = async (req, res) => {
  const medName = req.body.new_med_name;
  const medMRP = req.body.new_med_mrp;
  const primaryDrug = req.body.primary_drug;
  const dosage = req.body.dosage;
  const companyId = req.body.company_id;
  try {
    const result = await inventoryQueries.newMedicine({
      medName,
      medMRP,
      primaryDrug,
      dosage,
      companyId,
    });
    console.log(result);
    res.redirect('/inventory');
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

module.exports = { getInventoryPageDetails, addNewStock, addNewMedicine };
