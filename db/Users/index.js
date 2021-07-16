const connection = require('../connect');

const getEmployeeDetails = (username) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT employee.emp_id, employee.emp_name, employee.contact, 
      employee.address, employee.dob, employee. username
      FROM employee WHERE employee.username = ?`;
    connection.query(query, [username], (err, employeeDetails) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(employeeDetails);
    });
  });
};

const updateEmployeeUsername = (oldUsername, newUsername) => {
  return new Promise((resolve, reject) => {
    const query1 = 'UPDATE login SET username=? WHERE username=?';
    connection.query(query1, [newUsername, oldUsername], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

const updateEmployeeContact = (new_contact, emp_id) => {
  return new Promise((resolve, reject) => {
    const query2 = 'UPDATE employee SET contact=? WHERE emp_id=?';
    connection.query(query2, [new_contact, emp_id], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

const updateEmployeeAddress = (new_address, emp_id) => {
  return new Promise((resolve, reject) => {
    const query2 = 'UPDATE employee SET address=? WHERE emp_id=?';
    connection.query(query2, [new_address, emp_id], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  getEmployeeDetails,
  updateEmployeeUsername,
  updateEmployeeContact,
  updateEmployeeAddress,
};
