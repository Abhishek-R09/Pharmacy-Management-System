const connection = require('../connect');
const Async = require('async');

const getMedicinesAndStocks = () => {
  return new Promise((resolve, reject) => {
    const getMedicinesAndStocksQuery =
      "SELECT medicine.med_id, medicine.med_name, medicine.mrp, inventory.stock_id, \
  DATE_FORMAT(inventory.expiry_date,'%m-%d-%Y') AS expiry_date, \
  inventory.total_number, drug_manufacturer.name FROM \
  ((medicine INNER JOIN inventory ON medicine.med_id=inventory.med_id) INNER JOIN \
  drug_manufacturer ON medicine.company_id=drug_manufacturer.company_id) ORDER BY medicine.med_id";
    connection.query(getMedicinesAndStocksQuery, (err, medicinesAndStocks) => {
      if (err) {
        reject(err);
      }
      resolve(medicinesAndStocks);
    });
  });
};

const getPatientAndDoctor = () => {
  return new Promise((resolve, reject) => {
    const getPatientAndDocQuery =
      'SELECT patient_1.pat_id, patient_1.pat_name, patient_1.age, doctor_1.doc_name FROM \
  ((patient_1 INNER JOIN patient_2 ON patient_1.pat_id = patient_2.pat_id) \
  INNER JOIN doctor_1 ON patient_2.doc_id=doctor_1.doc_id) ORDER BY patient_1.pat_id';
    connection.query(getPatientAndDocQuery, (err, patientAndDoctor) => {
      if (err) {
        reject(err);
      }
      resolve(patientAndDoctor);
    });
  });
};

const getCurrentBillNo = () => {
  return new Promise((resolve, reject) => {
    const currBillQuery = 'SELECT MAX(bill_no) AS bill_no FROM bill_1';
    connection.query(currBillQuery, (err, billNo) => {
      if (err) {
        reject(err);
      }
      resolve(billNo);
    });
  });
};

const addNewBill = (billDetails) => {
  return new Promise((resolve, reject) => {
    const addBill1 =
      'INSERT INTO bill_1 (payment_mode, discount, pat_id, total_cost, bill_date)\
  VALUES (?,?,?,?,?)';
    const addBill2 =
      'INSERT INTO bill_2 (bill_no, quantity, med_id) VALUES \
(?,?,?)';
    const updateInventoryQuery =
      'UPDATE inventory SET total_number=total_number - ? WHERE stock_id = ?';
    connection.getConnection((connErr, transConn) => {
      if (connErr) {
        reject({ success: false, msg: connErr });
      } else {
        transConn.beginTransaction((transErr) => {
          if (transErr) {
            transConn.rollback(() => transConn.release());
            reject({ success: false, msg: transErr });
          } else {
            connection.query(
              addBill1,
              [
                billDetails.paymentMode,
                billDetails.discount,
                billDetails.patientId,
                billDetails.finalCost,
                billDetails.billDate,
              ],
              (addBillErr, addedBillDetails) => {
                if (addBillErr) {
                  console.log(addBillErr);
                  transConn.rollback(() => transConn.release());
                  reject({ success: false, msg: addBillErr });
                } else {
                  const billNo = addedBillDetails.insertId;
                  const totalItems = billDetails.medIds.length;
                  Async.times(
                    totalItems,
                    (i, next) => {
                      transConn.query(
                        addBill2,
                        [
                          billNo,
                          billDetails.medQuantity[i],
                          billDetails.medIds[i],
                        ],
                        (billErr, insertedBillRow) => {
                          if (billErr) {
                            next(billErr);
                          } else {
                            next();
                          }
                        }
                      );
                    },
                    (insertErr, billItems) => {
                      if (insertErr) {
                        console.log(insertErr);
                        transConn.rollback(() => transConn.release());
                        reject({ success: false, msg: insertErr });
                      } else {
                        Async.times(
                          totalItems,
                          (i, next) => {
                            transConn.query(
                              updateInventoryQuery,
                              [
                                billDetails.medQuantity[i],
                                billDetails.medStockIds[i],
                              ],
                              (inventoryErr, insertedInventoryRow) => {
                                if (inventoryErr) {
                                  next(inventoryErr);
                                } else {
                                  next();
                                }
                              }
                            );
                          },
                          (updateInventoryErr, updateInventoryResults) => {
                            if (updateInventoryErr) {
                              transConn.rollback(() => transConn.release());
                              reject({
                                success: false,
                                msg: updateInventoryErr,
                              });
                            } else {
                              transConn.commit((commitErr) => {
                                if (commitErr) {
                                  transConn.rollback(() => transConn.release());
                                  reject({ success: false, msg: commitErr });
                                } else {
                                  transConn.release();
                                  resolve({
                                    success: true,
                                    msg: { updateInventoryResults, billItems },
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
              }
            );
          }
        });
      }
    });
  });
};

module.exports = {
  getMedicinesAndStocks,
  getPatientAndDoctor,
  getCurrentBillNo,
  addNewBill,
};
