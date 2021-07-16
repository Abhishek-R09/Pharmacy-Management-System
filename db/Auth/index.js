const connection = require('../connect');

const getUserFromUsername = (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM login WHERE username = ?',
      [username],
      (err, user) => {
        if (err) {
          reject(err);
        }
        resolve(user);
      }
    );
  });
};

const addNewUser = (username, password, role) => {
  return new Promise((resolve, reject) => {
    const insertQuery =
      "INSERT INTO login ( username, password, role) values (?,?, 'Admin')";
    connection.query(insertQuery, [username, password], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.insertId);
    });
  });
};

module.exports = {
  getUserFromUsername,
  addNewUser,
};
