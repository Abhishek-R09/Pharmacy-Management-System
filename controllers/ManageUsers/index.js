const {
  getAllEmployees,
  addNewEmployee,
  deleteEmployee,
} = require('../../db/Users');
const bcrypt = require('bcryptjs');

const getEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.render('ManageUsers/index.ejs', {
      user: req.user,
      employees,
      message: '',
    });
  } catch (error) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

const addEmployee = async (req, res) => {
  const empName = req.body.emp_name;
  const empContact = req.body.emp_contact;
  const empDOB = req.body.emp_DOB;
  const empAddress = req.body.emp_address;
  const empUsername = req.body.emp_username;
  let empPassword;
  try {
    const salt = await bcrypt.genSalt();
    empPassword = await bcrypt.hash(req.body.emp_pass, salt);
  } catch (err) {
    return res
      .status(500)
      .send(`<pre>${err} Bcrypt error!</pre><br /><a href='/'>Go to home</a>`);
  }
  if (!empPassword) {
    return res
      .status(500)
      .send(`<pre>Bcrypt error!</pre><br /><a href='/'>Go to home</a>`);
  }
  const empRole = req.body.emp_role;
  try {
    const queryRes = await addNewEmployee({
      empName,
      empContact,
      empDOB,
      empAddress,
      empUsername,
      empPassword,
      empRole,
    });
    console.log(queryRes);
    res.redirect('/manageUsers');
  } catch (error) {
    console.log(error);
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

const removeEmployee = async (req, res) => {
  const empId = req.body.checkbox;
  try {
    const result = await deleteEmployee(empId);
    console.log(result);
    res.redirect('/manageUsers');
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

module.exports = { getEmployees, addEmployee, removeEmployee };
