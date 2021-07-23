const connection = require('../connect');

const medicineAndStockDetails = () => {
  return new Promise((resolve, reject) => {
    const medicineDetailsQuery =
      'SELECT medicine.med_id, medicine.med_name, medicine.mrp, medicine.primary_drug, \
  drug_manufacturer.name \
  FROM medicine \
  INNER JOIN drug_manufacturer ON medicine.company_id=drug_manufacturer.company_id ORDER BY medicine.med_id';

    const medicineStockDetailsQuery =
      "select inventory.stock_id, medicine.med_id, DATE_FORMAT(inventory.expiry_date,'%d-%m-%Y') AS expiry_date, \
    inventory.total_number\
    from inventory INNER JOIN \
    medicine ON inventory.med_id=medicine.med_id ORDER BY medicine.med_id;";

    const employeeDetailsQuery =
      'SELECT employee.emp_name, employee.emp_id, login.role \
      FROM employee inner join login ON employee.username=login.username';

    const drugManufacturerDetailsQuery = 'select * from drug_manufacturer';

    connection.getConnection((connErr, transConn) => {
      if (connErr) {
        reject({ success: false, msg: connErr });
      } else {
        transConn.beginTransaction((transErr) => {
          if (transErr) {
            transConn.rollback(() => transConn.release());
            reject({ success: false, msg: transErr });
          } else {
            transConn.query(
              medicineDetailsQuery,
              (getMedicinesErr, medicines) => {
                if (getMedicinesErr) {
                  transConn.rollback(() => transConn.release());
                  reject({ success: false, msg: getMedicinesErr });
                } else {
                  transConn.query(
                    medicineStockDetailsQuery,
                    (getStocksErr, stocks) => {
                      if (getStocksErr) {
                        transConn.rollback(() => transConn.release());
                        reject({ success: false, msg: getStocksErr });
                      } else {
                        transConn.query(
                          employeeDetailsQuery,
                          (getEmployeesErr, employees) => {
                            if (getEmployeesErr) {
                              transConn.rollback(() => transConn.release());
                              reject({ success: false, msg: getEmployeesErr });
                            } else {
                              transConn.query(
                                drugManufacturerDetailsQuery,
                                (dmErr, drugManufacturers) => {
                                  if (dmErr) {
                                    transConn.rollback(() =>
                                      transConn.release()
                                    );
                                    reject({ success: false, msg: dmErr });
                                  } else {
                                    transConn.commit((commitErr) => {
                                      if (commitErr) {
                                        transConn.rollback(() =>
                                          transConn.release()
                                        );
                                        reject({
                                          success: false,
                                          msg: commitErr,
                                        });
                                      } else {
                                        transConn.release();
                                        resolve({
                                          success: true,
                                          data: {
                                            medicines,
                                            stocks,
                                            employees,
                                            drugManufacturers,
                                          },
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
              }
            );
          }
        });
      }
    });
  });
};

const newStock = (stockDetails) => {
  return new Promise((resolve, reject) => {
    const newStockQuery =
      'INSERT INTO inventory (med_id, expiry_date, total_number, emp_id) \
  VALUES (?,?,?,?)';
    connection.query(
      newStockQuery,
      [
        stockDetails.medId,
        stockDetails.expiryDate,
        stockDetails.totalStock,
        stockDetails.associatedEmpId,
      ],
      (addStockErr, newStockRes) => {
        if (addStockErr) {
          console.log(addStockErr);
          reject({ success: false, msg: addStockErr });
        } else {
          resolve({ success: true, data: newStockRes });
        }
      }
    );
  });
};

const newMedicine = (medicineDetails) => {
  return new Promise((resolve, reject) => {
    const newMedQuery =
      'INSERT INTO medicine (med_name, mrp, primary_drug, dosage, company_id) \
  VALUES (?,?,?,?,?)';
    connection.query(
      newMedQuery,
      [
        medicineDetails.medName,
        medicineDetails.medMRP,
        medicineDetails.primaryDrug,
        medicineDetails.dosage,
        medicineDetails.companyId,
      ],
      (addMedErr, addMedRes) => {
        if (addMedErr) {
          console.log(addMedErr);
          reject({ success: false, msg: addMedErr });
        } else {
          resolve({ success: true, data: addMedRes });
        }
      }
    );
  });
};

module.exports = { medicineAndStockDetails, newStock, newMedicine };
