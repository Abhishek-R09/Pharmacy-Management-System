const {
  getEmployeeDetails,
  updateEmployeeUsername,
  updateEmployeeContact,
  updateEmployeeAddress,
} = require('../../db/Users');

const retrieveEmployeeDetails = async (req, res) => {
  try {
    const employeeDetails = await getEmployeeDetails(req.user.username);
    res.render('Home/index.ejs', {
      user: req.user,
      userDetails: employeeDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(`<pre>${error}</><br /><a href='/'>Go to home!</>`);
  }
};

const updateEmployeeDetails = async (req, res) => {
  const emp_id = req.body.empId;
  // const old_username = req.body.oldUsername;
  const old_username = req.user.username;
  const new_username = req.body?.empUsername;
  const emp_contact = req.body?.empContact;
  const emp_address = req.body?.empAddress;

  // console.log(old_username);
  // console.log(new_username);
  // console.log(emp_contact);
  // console.log(emp_address);

  if (old_username != new_username) {
    try {
      const result = await updateEmployeeUsername(old_username, new_username);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  if (emp_contact) {
    try {
      const result = await updateEmployeeContact(emp_contact, emp_id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  if (emp_address) {
    try {
      const result = await updateEmployeeAddress(emp_address, emp_id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  res.redirect('/');
};

module.exports = { retrieveEmployeeDetails, updateEmployeeDetails };
