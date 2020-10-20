// const { connection } = require("../config/database");
/*jshint multistr: true */
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var bcrypt = require('bcrypt-nodejs');
connection.query('USE ' + dbconfig.database);

// app/routes.js
module.exports = function (app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	// app.get('/', function (req, res) {
	// 	res.redirect('/login'); // load the index.ejs file
	// });

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function (req, res) {
		// if (isLoggedIn()){
		// 	res.redirect('/home');
		// }

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/', // redirect to the secure profile section
		failureRedirect: '/login', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}),
		function (req, res) {
			console.log("hello");

			if (req.body.remember) {
				req.session.cookie.maxAge = 1000 * 60 * 3;
			} else {
				req.session.cookie.expires = false;
			}
			res.redirect('/login');
		});

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	// app.get('/signup', function (req, res) {
	// 	// render the page and pass in any flash data if it exists
	// 	res.render('signup.ejs', { message: req.flash('signupMessage') });
	// });

	// process the signup form
	// app.post('/signup', passport.authenticate('local-signup', {
	// 	successRedirect: '/home', // redirect to the secure profile section
	// 	failureRedirect: '/signup', // redirect back to the signup page if there is an error
	// 	failureFlash: true // allow flash messages
	// }));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/', isLoggedIn, function (req, res) {
		res.render('index.ejs', {
			user: req.user // get the user out of session and pass to template
		});
	});

	app.get("/manageUsers", isLoggedIn, function(req, res){
		var query1 = "SELECT employee.emp_id, employee.emp_name, employee.contact, employee.address, employee.username, login.role FROM employee INNER JOIN login ON employee.username=login.username ORDER BY employee.emp_id";
		connection.query(
			query1 ,function(err, rows){
				res.render('manage_users.ejs', {user: req.user, rows: rows, message: ""});
			});
		// res.render('manage_users.ejs',{user: req.user});
	});

	app.post("/addUser", function(req,res){
		var empName = req.body.emp_name;
		var empContact = req.body.emp_contact;
		var empDOB = req.body.emp_DOB;
		var empAddress = req.body.emp_address;
		var empUsername = req.body.emp_username;
		var empPassword = bcrypt.hashSync(req.body.emp_pass, null, null);
		var empRole = req.body.emp_role;
		var queryToCheckUsername = "SELECT * FROM login WHERE username = ?";
		connection.query(queryToCheckUsername,[empUsername], function(err, rows){
			if (err){
				console.log(err);
			}else{
				if (rows.length){
					res.render('manage_users.ejs', {user: req.user, rows: rows, message: "Username already taken!"});
				}else{
					var queryToAddEmployee = "INSERT INTO employee (emp_name, contact, address, dob, username) VALUES (?, ?, ?, ?, ?)";
					var queryToAddEmpCredentials = "INSERT INTO login (username, password, role) VALUES (?, ?, ?)";
					connection.query(queryToAddEmpCredentials, [empUsername, empPassword, empRole], function(err, rows){
						if (err) {
							console.log(err);
						}
						console.log("Successfully entered login credentials of the employee");
					});
					connection.query(queryToAddEmployee, [empName, empContact, empAddress, empDOB, empUsername], function(err, rows){
						if (err){
							console.log(err);
						}
						console.log("Successfully inserted an employee");
					});
					res.redirect('/manageUsers');
					
				}
			}
		});

	});

	app.post("/deleteEmployee", function(req,res){
		var empId = req.body.checkbox;
		// console.log(empId);
		var query1 = "SELECT employee.username FROM employee INNER JOIN login ON employee.username=login.username AND emp_id = ?";
		
		connection.query(query1, [empId] ,function(err,rows){
			var empUsername=rows[0].username;
			console.log(rows[0].username);
			var queryToRemoveCred = "DELETE FROM login WHERE username = ?";
			connection.query(queryToRemoveCred, [empUsername] ,function(err,rows){
				if (err){
					console.log(err);
				}
				console.log("1 row deleted");
			});
			res.redirect('/manageUsers');
		});
	});
		// console.log(empUsername);
		

	app.get("/createBill", isLoggedIn, function(req,res){
		res.render('create_bill.ejs', {user: req.user});
	});

	app.get("/patients", isLoggedIn, function(req,res){
		var query1 = "SELECT patient_1.pat_name, patient_1.contact, patient_1.address, patient_1.gender, patient_1.age, doctor_1.doc_name \
			FROM ((patient_1 INNER JOIN patient_2 ON patient_1.pat_id=patient_2.pat_id) \
			INNER JOIN doctor_1 ON patient_2.doc_id=doctor_1.doc_id)";
		connection.query(
			query1 ,function(err, rows){
				const query2 = "SELECT doc_id, doc_name FROM doctor_1";
				connection.query(query2, function(err, rows2){
					res.render('patient_details.ejs', {user: req.user, rows: rows, rows2:rows2, message: ""});
				});

			});
		// res.render('patient_details.ejs', {user: req.user});
	});

	app.get("/doctors", isLoggedIn, function(req, res){
		var query = "SELECT doc_name, contact, specialization FROM doctor_1";
		connection.query(query,function(err, rows){
			res.render('doctor_details.ejs', {user: req.user, rows: rows});
		});
		// res.render("doctor_details.ejs", {user: req.user});
	});

	app.get("/inventory", isLoggedIn, function(req, res){
		var query = "SELECT medicine.med_id, medicine.med_name, medicine.mrp, medicine.primary_drug, drug_manufacturer.name \
		FROM medicine \
		INNER JOIN drug_manufacturer ON medicine.company_id=drug_manufacturer.company_id ORDER BY medicine.med_id";
		connection.query(query, function(err, rows){
			var query1 = "select inventory.stock_id, medicine.med_id, inventory.expiry_date, inventory.total_number\
			from inventory INNER JOIN \
			medicine ON inventory.med_id=medicine.med_id ORDER BY medicine.med_id;";
			connection.query(query1, function(err, rows1){
				res.render('inventory.ejs', {user: req.user, rows: rows, rows1: rows1});
			});
			// res.render('inventory.ejs', {user: req.user, rows: rows});
		});
		// res.render("inventory.ejs", {user: req.user});
	});

	// app.get("/inventory", isLoggedIn, function(req, res){
	// 	res.render()
	// });

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
	if (req.isAuthenticated()){
		// res.redirect('/home');
		return next();
	}

	// if they aren't redirect them to the home page
	res.redirect('/login');
}
