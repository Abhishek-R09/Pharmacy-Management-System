/*jshint multistr: true */
var bcrypt = require('bcryptjs');
// connection.query('USE ' + dbconfig.database);
const connection = require('../db/connect');

module.exports = function (app, passport) {
  app.get('/login', function (req, res) {
    // if (isLoggedIn()){
    // 	res.redirect('/home');
    // }

    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    }),
    function (req, res) {
      console.log('hello');

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect('/login');
    }
  );

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/home', // redirect to the secure profile section
      failureRedirect: '/signup', // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/', isLoggedIn, function (req, res) {
    var query =
      'SELECT employee.emp_id, employee.emp_name, employee.contact, employee.address, employee.dob, employee. username\
		FROM employee WHERE employee.username = ?';
    connection.query(query, [req.user.username], function (err, rows) {
      if (err) {
        console.log(err);
      }
      res.render('index.ejs', {
        user: req.user,
        rows: rows,
      });
    });
  });

  app.post('/updateDetails', function (req, res) {
    var emp_id = req.body.empId;
    var old_username = req.body.oldUsername;
    var emp_username = req.body.empUsername;
    var emp_contact = req.body.empContact;
    var emp_address = req.body.empAddress;
    console.log(emp_id);
    console.log(emp_username);
    console.log(emp_contact);
    console.log(emp_address);
    if (req.body.empUsername) {
      var query1 = 'UPDATE login SET username=? WHERE username=?';
      connection.query(
        query1,
        [emp_username, old_username],
        function (err, rows) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    if (req.body.empContact) {
      var query2 = 'UPDATE employee SET contact=? WHERE emp_id=?';
      connection.query(query2, [emp_contact, emp_id], function (err, rows) {
        if (err) {
          console.log(err);
        }
      });
    }
    if (req.body.empAddress) {
      var query2 = 'UPDATE employee SET address=? WHERE emp_id=?';
      connection.query(query2, [emp_address, emp_id], function (err, rows) {
        if (err) {
          console.log(err);
        }
      });
    }
    res.redirect('/logout');
  });

  app.get('/manageUsers', isLoggedIn, function (req, res) {
    var query1 =
      'SELECT employee.emp_id, employee.emp_name, employee.contact, employee.address, \
		employee.username, login.role FROM employee INNER JOIN login \
		ON employee.username=login.username ORDER BY employee.emp_id';
    connection.query(query1, function (err, rows) {
      res.render('manage_users.ejs', {
        user: req.user,
        rows: rows,
        message: '',
      });
    });
    // res.render('manage_users.ejs',{user: req.user});
  });

  app.post('/addUser', function (req, res) {
    var empName = req.body.emp_name;
    var empContact = req.body.emp_contact;
    var empDOB = req.body.emp_DOB;
    var empAddress = req.body.emp_address;
    var empUsername = req.body.emp_username;
    var empPassword = bcrypt.hashSync(req.body.emp_pass, null, null);
    var empRole = req.body.emp_role;
    var queryToCheckUsername = 'SELECT * FROM login WHERE username = ?';
    connection.query(queryToCheckUsername, [empUsername], function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        if (rows.length) {
          res.render('manage_users.ejs', {
            user: req.user,
            rows: rows,
            message: 'Username already taken!',
          });
        } else {
          var queryToAddEmployee =
            'INSERT INTO employee (emp_name, contact, address, dob, username) \
					VALUES (?, ?, ?, ?, ?)';
          var queryToAddEmpCredentials =
            'INSERT INTO login (username, password, role) VALUES (?, ?, ?)';
          connection.query(
            queryToAddEmpCredentials,
            [empUsername, empPassword, empRole],
            function (err, rows) {
              if (err) {
                console.log(err);
              }
              console.log(
                'Successfully entered login credentials of the employee'
              );
            }
          );
          connection.query(
            queryToAddEmployee,
            [empName, empContact, empAddress, empDOB, empUsername],
            function (err, rows) {
              if (err) {
                console.log(err);
              }
              console.log('Successfully inserted an employee');
            }
          );
          res.redirect('/manageUsers');
        }
      }
    });
  });

  app.post('/deleteEmployee', function (req, res) {
    var empId = req.body.checkbox;
    // console.log(empId);
    var query1 =
      'SELECT employee.username \
		FROM employee INNER JOIN login \
		ON employee.username=login.username AND emp_id = ?';

    connection.query(query1, [empId], function (err, rows) {
      var empUsername = rows[0].username;
      console.log(rows[0].username);
      var queryToRemoveCred = 'DELETE FROM login WHERE username = ?';
      connection.query(queryToRemoveCred, [empUsername], function (err, rows) {
        if (err) {
          console.log(err);
        }
        console.log('1 row deleted');
      });
      res.redirect('/manageUsers');
    });
  });
  // console.log(empUsername);

  app.get('/createBill', isLoggedIn, function (req, res) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    // document.write(today);
    var query1 =
      "SELECT medicine.med_id, medicine.med_name, medicine.mrp, inventory.stock_id, \
		DATE_FORMAT(inventory.expiry_date,'%m-%d-%Y') AS expiry_date, \
		inventory.total_number, drug_manufacturer.name FROM \
		((medicine INNER JOIN inventory ON medicine.med_id=inventory.med_id) INNER JOIN \
		drug_manufacturer ON medicine.company_id=drug_manufacturer.company_id) ORDER BY medicine.med_id";
    connection.query(query1, function (err, rows) {
      // res.render('create_bill.ejs', {user: req.user, rows: rows, rows1: rows1});
      // console.log(rows)
      var query2 =
        'SELECT patient_1.pat_id, patient_1.pat_name, patient_1.age, doctor_1.doc_name FROM \
			((patient_1 INNER JOIN patient_2 ON patient_1.pat_id = patient_2.pat_id) \
			INNER JOIN doctor_1 ON patient_2.doc_id=doctor_1.doc_id) ORDER BY patient_1.pat_id';
      connection.query(query2, function (err, rows2) {
        connection.query(
          'SELECT MAX(bill_no) AS bill_no FROM bill_1',
          function (err, bills) {
            res.render('create_bill.ejs', {
              user: req.user,
              rows: rows,
              rows2: rows2,
              today: today,
              bills: bills,
            });
          }
        );
      });
    });
    // res.render('create_bill.ejs', {user: req.user});
  });

  app.post('/generateBill', function (req, res) {
    var patientId = req.body.patId;
    var billDate = req.body.billDate;
    var paymentMode = req.body.paymentMode;
    var discount = req.body.discount;
    var finalCost = req.body.finalTotalCost;
    var medIds = [];
    var medQuantity = [];
    var medStockIds = [];
    var i = 0;
    while (req.body['medId' + i]) {
      // var idNo = 'medId'+i;
      medIds.push(req.body['medId' + i]);
      medQuantity.push(req.body['medQuantity' + i]);
      medStockIds.push(req.body['medStockId' + i]);
      ++i;
    }
    console.log(medIds);
    console.log(medQuantity);
    console.log(medStockIds);
    console.log(patientId);
    console.log(billDate);
    console.log(paymentMode);
    console.log(discount);
    console.log(finalCost);
    var query1 =
      'INSERT INTO bill_1 (payment_mode, discount, pat_id, total_cost, bill_date)\
		VALUES (?,?,?,?,?)';
    var billNo;
    connection.query(
      query1,
      [paymentMode, discount, patientId, finalCost, billDate],
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        billNo = rows.insertId;
        var query2 =
          'INSERT INTO bill_2 (bill_no, quantity, med_id) VALUES \
			(?,?,?)';
        for (let index = 0; index < medIds.length; index++) {
          connection.query(
            query2,
            [billNo, medQuantity[index], medIds[index]],
            function (err, rows2) {
              if (err) {
                console.log(err);
              }
              console.log('Number of records inserted: ' + rows2.affectedRows);
            }
          );
        }
      }
    );
    for (var i = 0; i < medIds.length; ++i) {
      var query3 =
        'UPDATE inventory SET total_number=total_number - ? WHERE stock_id = ?';
      connection.query(
        query3,
        [medQuantity[i], medStockIds[i]],
        function (err, rows3) {
          if (err) {
            console.log(err);
          }
          console.log('Rows affected:', rows3.affectedRows);
        }
      );
    }
    res.redirect('/invoiceHistory');
  });

  app.get('/patients', isLoggedIn, function (req, res) {
    var query1 =
      'SELECT patient_1.pat_id, patient_1.pat_name, patient_1.contact, patient_1.address, patient_1.gender, \
			patient_1.age, doctor_1.doc_name \
			FROM ((patient_1 INNER JOIN patient_2 ON patient_1.pat_id=patient_2.pat_id) \
			INNER JOIN doctor_1 ON patient_2.doc_id=doctor_1.doc_id)\
			ORDER BY patient_1.pat_id';
    connection.query(query1, function (err, rows) {
      const query2 = 'SELECT doc_id, doc_name FROM doctor_1';
      connection.query(query2, function (err, rows2) {
        res.render('patient_details.ejs', {
          user: req.user,
          rows: rows,
          rows2: rows2,
          message: '',
        });
      });
    });
    // res.render('patient_details.ejs', {user: req.user});
  });

  app.post('/addPatient', function (req, res) {
    var patName = req.body.patient_name;
    var patContact = req.body.patient_contact;
    var patAddress = req.body.patient_address;
    var patGender = req.body.patient_gender;
    var patAge = req.body.patient_age;
    var patInsuranceId = req.body.patient_insurance_id;
    var patDoc = req.body.patient_doctor;
    var query =
      'INSERT INTO patient_1 (pat_name, contact, gender, insurance_id, age, address) VALUES \
		(?,?,?,?,?,?)';
    connection.query(
      query,
      [patName, patContact, patGender, patInsuranceId, patAge, patAddress],
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        var query2 = 'INSERT INTO patient_2 VALUES (?,?)';
        connection.query(
          query2,
          [rows.insertId, patDoc],
          function (err, rows2) {
            if (err) {
              console.log(err);
            }
            res.redirect('/patients');
          }
        );
      }
    );
  });

  app.get('/doctors', isLoggedIn, function (req, res) {
    var query = 'SELECT doc_name, contact, specialization FROM doctor_1';
    connection.query(query, function (err, rows) {
      res.render('doctor_details.ejs', { user: req.user, rows: rows });
    });
    // res.render("doctor_details.ejs", {user: req.user});
  });

  app.post('/addDoctor', function (req, res) {
    var docName = req.body.doctor_name;
    var docContact = req.body.doctor_contact;
    var docSpecialization = req.body.doctor_specialization;
    var query =
      'INSERT INTO doctor_1 (doc_name, contact, specialization) VALUES (?,?,?)';
    connection.query(
      query,
      [docName, docContact, docSpecialization],
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        res.redirect('/doctors');
      }
    );
  });

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

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    // setTimeout(function(){ window.location = "../views/login.ejs"; },3000);
    res.redirect('/login');
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    // res.redirect('/home');
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/login');
}
