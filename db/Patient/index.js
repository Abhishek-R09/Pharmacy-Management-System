const connection = require('../connect');

const getPatients = () => {
  return new Promise((resolve, reject) => {
    const existingPatientsQuery =
      'SELECT patient_1.pat_id, patient_1.pat_name, patient_1.contact, patient_1.address, patient_1.gender, \
    patient_1.age, doctor_1.doc_name \
    FROM ((patient_1 INNER JOIN patient_2 ON patient_1.pat_id=patient_2.pat_id) \
    INNER JOIN doctor_1 ON patient_2.doc_id=doctor_1.doc_id)\
    ORDER BY patient_1.pat_id';
    connection.query(existingPatientsQuery, (err, patients) => {
      if (err) {
        reject(err);
      } else {
        resolve(patients);
      }
    });
  });
};

const addNewPatient = (patientDetails) => {
  return new Promise((resolve, reject) => {
    const {
      patName,
      patContact,
      patGender,
      patInsuranceId,
      patAge,
      patAddress,
      patDoc,
    } = patientDetails;
    const addPatientQuery1 =
      'INSERT INTO patient_1 (pat_name, contact, gender, insurance_id, age, address) VALUES \
  (?,?,?,?,?,?)';
    const addPatientQuery2 = 'INSERT INTO patient_2 VALUES (?,?)';
    connection.getConnection((connErr, transConn) => {
      if (connErr) {
        resolve({ success: false, msg: connErr });
      } else {
        transConn.beginTransaction((transErr) => {
          if (transErr) {
            transConn.rollback(() => {
              transConn.release();
            });
            reject({ success: false, msg: transErr });
          } else {
            connection.query(
              addPatientQuery1,
              [
                patName,
                patContact,
                patGender,
                patInsuranceId,
                patAge,
                patAddress,
              ],
              (addPatient1Err, addedPatientDetail1) => {
                if (addPatient1Err) {
                  console.log(addPatient1Err);
                  transConn.rollback(() => transConn.release());
                  reject({ success: false, msg: addPatient1Err });
                } else {
                  connection.query(
                    addPatientQuery2,
                    [addedPatientDetail1.insertId, patDoc],
                    (addPatient2Err, addedPatientDetail2) => {
                      if (addPatient2Err) {
                        console.log(addPatient2Err);
                        transConn.rollback(() => transConn.release());
                        reject({ success: false, msg: addPatient2Err });
                      } else {
                        transConn.commit((commitErr) => {
                          if (commitErr) {
                            transConn.rollback(() => transConn.release());
                            reject({ success: false, msg: commitErr });
                          } else {
                            transConn.release();
                            resolve({
                              success: true,
                              addedPatientDetail1,
                              addedPatientDetail2,
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
      }
    });
  });
};

module.exports = { getPatients, addNewPatient };
