/*jshint multistr: true */
const connection = require('../db/connect');
const { isLoggedIn } = require('../middlewares/isAuthenticated');

module.exports = function (app) {
  app.get('/inventory', isLoggedIn, function (req, res) {
    var query =
      'SELECT medicine.med_id, medicine.med_name, medicine.mrp, medicine.primary_drug, \
		drug_manufacturer.name \
		FROM medicine \
		INNER JOIN drug_manufacturer ON medicine.company_id=drug_manufacturer.company_id ORDER BY medicine.med_id';
    connection.query(query, function (err, rows) {
      var query1 =
        "select inventory.stock_id, medicine.med_id, DATE_FORMAT(inventory.expiry_date,'%d-%m-%Y') AS expiry_date, \
			inventory.total_number\
			from inventory INNER JOIN \
			medicine ON inventory.med_id=medicine.med_id ORDER BY medicine.med_id;";
      connection.query(query1, function (err, rows1) {
        var query3 =
          'SELECT employee.emp_name, employee.emp_id, login.role \
				FROM employee inner join login ON employee.username=login.username';
        connection.query(query3, function (err, rows2) {
          var query4 = 'select * from drug_manufacturer';
          connection.query(query4, function (err, rows3) {
            res.render('inventory.ejs', {
              user: req.user,
              rows: rows,
              rows1: rows1,
              rows2: rows2,
              rows3: rows3,
            });
          });
        });
      });
      // res.render('inventory.ejs', {user: req.user, rows: rows});
    });
    // res.render("inventory.ejs", {user: req.user});
  });

  app.post('/addStock', function (req, res) {
    var medId = req.body.med_id;
    var expiryDate = req.body.expiry_date;
    var totalStock = req.body.total_stock;
    var associatedEmpId = req.body.associated_emp_id;
    console.log(medId);
    console.log(expiryDate);
    console.log(totalStock);
    console.log(associatedEmpId);
    var query =
      'INSERT INTO inventory (med_id, expiry_date, total_number, emp_id) \
		VALUES (?,?,?,?)';
    connection.query(
      query,
      [medId, expiryDate, totalStock, associatedEmpId],
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        res.redirect('/inventory');
      }
    );
  });

  app.post('/addMedicine', function (req, res) {
    var medName = req.body.new_med_name;
    var medMRP = req.body.new_med_mrp;
    var primaryDrug = req.body.primary_drug;
    var dosage = req.body.dosage;
    var companyId = req.body.company_id;
    var query =
      'INSERT INTO medicine (med_name, mrp, primary_drug, dosage, company_id) \
		VALUES (?,?,?,?,?)';
    connection.query(
      query,
      [medName, medMRP, primaryDrug, dosage, companyId],
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        res.redirect('/inventory');
      }
    );
  });

  app.get('/invoiceHistory', isLoggedIn, function (req, res) {
    var query =
      "SELECT bill_1.bill_no, bill_1.payment_mode, bill_1.discount, bill_1.total_cost, \
		DATE_FORMAT(bill_1.bill_date,'%d-%m-%Y') AS bill_date, patient_1.pat_name\
		 FROM bill_1 INNER JOIN patient_1 ON bill_1.pat_id=patient_1.pat_id ORDER BY bill_1.bill_date DESC";
    connection.query(query, function (err, rows) {
      res.render('invoice_history.ejs', { user: req.user, rows: rows });
    });
  });

  app.get('/billNo:billId', isLoggedIn, function (req, res) {
    var billId = req.params.billId;
    var query =
      "SELECT \
		bill_1.bill_no, bill_1.payment_mode, bill_1.discount, bill_1.total_cost, \
		DATE_FORMAT(bill_1.bill_date,'%Y-%m-%d') AS bill_date, patient_1.pat_name, \
		patient_1.pat_id, patient_1.age, bill_2.quantity, medicine.med_name, \
		medicine.mrp FROM bill_1 INNER JOIN patient_1 ON bill_1.pat_id=patient_1.pat_id \
		INNER JOIN bill_2 ON bill_1.bill_no=bill_2.bill_no \
		INNER JOIN medicine ON bill_2.med_id=medicine.med_id WHERE bill_1.bill_no = ?";

    // var query = "SELECT bill_1.bill_no, bill_1.payment_mode, bill_1.discount, bill_1.total_cost, \
    // DATE_FORMAT(bill_1.bill_date,\'%d-%m-%Y\') AS bill_date, patient_1.pat_name, bill_2.quantity, medicine.med_name\
    // ((FROM bill_1 INNER JOIN patient_1 ON bill_1.pat_id=patient_1.pat_id) \
    // INNER JOIN bill_2 ON bill_1.bill_no=bill_2.bill_no) WHERE bill_1.bill_no = ?";
    // var query1 = "SELECT * FROM bill_1 INNER JOIN bill_2 ON bill_1.bill_no=bill_2.bill_no";

    connection.query(query, [billId], function (err, rows) {
      if (err) {
        console.log(err);
      }
      res.render('billDetails.ejs', { user: req.user, rows: rows });
    });
  });
};
