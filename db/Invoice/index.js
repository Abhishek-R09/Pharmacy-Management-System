const connection = require('../connect');

const getBillMini = () => {
  return new Promise((resolve, reject) => {
    const allInvoicesQuery =
      "SELECT bill_1.bill_no, bill_1.payment_mode, bill_1.discount, bill_1.total_cost, \
  DATE_FORMAT(bill_1.bill_date,'%d-%m-%Y') AS bill_date, patient_1.pat_name\
   FROM bill_1 INNER JOIN patient_1 ON bill_1.pat_id=patient_1.pat_id ORDER BY bill_1.bill_date DESC";
    connection.query(allInvoicesQuery, (getInvoicesErr, invoices) => {
      if (getInvoicesErr) {
        reject({ success: false, msg: getInvoicesErr });
      } else {
        resolve({ success: true, data: invoices });
      }
    });
  });
};

const getBillByBillID = (billId) => {
  return new Promise((resolve, reject) => {
    const billDetailsQuery =
      "SELECT \
  bill_1.bill_no, bill_1.payment_mode, bill_1.discount, bill_1.total_cost, \
  DATE_FORMAT(bill_1.bill_date,'%Y-%m-%d') AS bill_date, patient_1.pat_name, \
  patient_1.pat_id, patient_1.age, bill_2.quantity, medicine.med_name, \
  medicine.mrp FROM bill_1 INNER JOIN patient_1 ON bill_1.pat_id=patient_1.pat_id \
  INNER JOIN bill_2 ON bill_1.bill_no=bill_2.bill_no \
  INNER JOIN medicine ON bill_2.med_id=medicine.med_id WHERE bill_1.bill_no = ?";

    // var query = "SELECT bill_1.bill_no, bill_1.payment_mode, bill_1.discount, bill_1.total_cost, \
    // DATE_FORMAT(bill_1.bill_date,\'%d-%m-%Y\') AS bill_date, patient_1.pat_name, bill_2.quantity, medicine.med_name\
    // ((FROM bill_1 INNER JOIN patient_1 ON bill_1.pat_id=patient_1.pat_id) \
    // INNER JOIN bill_2 ON bill_1.bill_no=bill_2.bill_no) WHERE bill_1.bill_no = ?";
    // var query1 = "SELECT * FROM bill_1 INNER JOIN bill_2 ON bill_1.bill_no=bill_2.bill_no";

    connection.query(billDetailsQuery, [billId], (getBillErr, billDetails) => {
      if (getBillErr) {
        reject({ success: false, msg: getBillErr });
      } else {
        resolve({ success: true, data: billDetails });
      }
    });
  });
};

module.exports = { getBillMini, getBillByBillID };
