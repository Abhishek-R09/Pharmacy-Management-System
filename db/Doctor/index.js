const connection = require('../connect');

const getDoctorsIdAndName = () => {
  return new Promise((resolve, reject) => {
    const existingDoctorsQuery = 'SELECT doc_id, doc_name FROM doctor_1';
    connection.query(existingDoctorsQuery, (err, doctorsIdAndName) => {
      if (err) {
        reject(err);
      } else {
        resolve(doctorsIdAndName);
      }
    });
  });
};

const getDoctorDetails = () => {
  return new Promise((resolve, reject) => {
    const existingDoctorsQuery =
      'SELECT doc_name, contact, specialization FROM doctor_1';
    connection.query(existingDoctorsQuery, (err, doctors) => {
      if (err) {
        reject(err);
      } else {
        resolve(doctors);
      }
    });
  });
};

const addNewDoctor = (doctorDetails) => {
  const { docName, docContact, docSpecialization } = doctorDetails;
  return new Promise((resolve, reject) => {
    const addDoctorQuery =
      'INSERT INTO doctor_1 (doc_name, contact, specialization) VALUES (?,?,?)';
    connection.query(
      addDoctorQuery,
      [docName, docContact, docSpecialization],
      (err, addedDocDetails) => {
        if (err) {
          console.log(err);
          reject({ success: false, msg: err });
        } else {
          resolve({ success: true, msg: addedDocDetails });
        }
      }
    );
  });
};

module.exports = { getDoctorsIdAndName, getDoctorDetails, addNewDoctor };
