const connection = require('../connect');
const { getUserFromUsername } = require('../Auth');

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

const getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    const query1 =
      'SELECT employee.emp_id, employee.emp_name, employee.contact, employee.address, \
  employee.username, login.role FROM employee INNER JOIN login \
  ON employee.username=login.username ORDER BY employee.emp_id';
    connection.query(query1, (err, allEmployees) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(allEmployees);
    });
  });
};

const addNewEmployee = (empDetails) => {
  return new Promise(async (resolve, reject) => {
    let existingUsers;
    try {
      existingUsers = await getUserFromUsername(empDetails.empUsername);
    } catch (error) {
      console.log(err);
    }
    if (existingUsers.length !== 0) {
      console.log(existingUsers);
      reject('Username already taken!');
    } else {
      const queryToAddEmployee = `INSERT INTO employee (emp_name, contact, address, dob, 
        username) VALUES (?, ?, ?, ?, ?)`;
      const queryToAddEmpCredentials = `INSERT INTO login (username, password, role) VALUES (?, ?, ?)`;
      connection.getConnection((connErr, transactionConn) => {
        if (connErr) {
          reject({ success: false, msg: connErr });
        }
        transactionConn.beginTransaction((transError) => {
          if (transError) {
            transactionConn.rollback(() => transactionConn.release());
            reject({ success: false, msg: transError });
          } else {
            transactionConn.query(
              queryToAddEmpCredentials,
              [
                empDetails.empUsername,
                empDetails.empPassword,
                empDetails.empRole,
              ],
              (loginAddErr, addLoginQueryResult) => {
                if (loginAddErr) {
                  console.log(loginAddErr);
                  transactionConn.rollback(() => transactionConn.release());
                  reject({ success: false, msg: loginAddErr });
                } else {
                  console.log(
                    'Successfully entered login credentials of the employee',
                    addLoginQueryResult
                  );
                  transactionConn.query(
                    queryToAddEmployee,
                    [
                      empDetails.empName,
                      empDetails.empContact,
                      empDetails.empAddress,
                      empDetails.empDOB,
                      empDetails.empUsername,
                    ],
                    (empAddErr, addEmpQueryResult) => {
                      if (empAddErr) {
                        console.log(empAddErr);
                        transactionConn.rollback(() =>
                          transactionConn.release()
                        );
                        reject({ success: false, msg: empAddErr });
                      } else {
                        console.log(
                          'Successfully inserted an employee',
                          addEmpQueryResult
                        );
                        transactionConn.commit((commitErr) => {
                          if (commitErr) {
                            transactionConn.rollback(() =>
                              transactionConn.release()
                            );
                            reject({ success: false, msg: commitErr });
                          } else {
                            transactionConn.release();
                            resolve({
                              success: true,
                              msg: 'Successfully added new user!',
                            });
                          }
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        });
      });
    }
  });
};

const deleteEmployee = (empId) => {
  return new Promise((resolve, reject) => {
    const query1 = `SELECT employee.username 
    FROM employee INNER JOIN login 
    ON employee.username=login.username AND emp_id = ?`;
    const queryToRemoveCred = 'DELETE FROM login WHERE username = ?';
    // const queryToRemoveEmployee = 'DELETE FROM employee WHERE username = ?';
    connection.getConnection((connErr, transactionConn) => {
      if (connErr) {
        reject({ success: false, msg: connErr });
      } else {
        transactionConn.beginTransaction((transError) => {
          if (transError) {
            transactionConn.rollback(() => transactionConn.release());
            reject({ success: false, msg: transError });
          } else {
            transactionConn.query(
              query1,
              [empId],
              (query1Err, usernameOfEmp) => {
                if (query1Err) {
                  transactionConn.rollback(() => transactionConn.release());
                  reject({ success: false, msg: query1Err });
                } else {
                  const empUsername = usernameOfEmp[0].username;
                  console.log(usernameOfEmp[0].username);
                  transactionConn.query(
                    queryToRemoveCred,
                    [empUsername],
                    (query2Err, empDelResult) => {
                      if (query2Err) {
                        console.log(query2Err);
                        transactionConn.rollback(() =>
                          transactionConn.release()
                        );
                        reject({ success: false, msg: query2Err });
                      } else {
                        transactionConn.commit((commitErr) => {
                          if (commitErr) {
                            transactionConn.rollback(() =>
                              transactionConn.release()
                            );
                            reject({ success: false, msg: commitErr });
                          } else {
                            console.log('1 row deleted');
                            transactionConn.release();
                            resolve({ success: true, msg: empDelResult });
                          }
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    });
  });
};

module.exports = {
  getEmployeeDetails,
  updateEmployeeUsername,
  updateEmployeeContact,
  updateEmployeeAddress,
  getAllEmployees,
  addNewEmployee,
  deleteEmployee,
};
