const patientQueries = require('../../db/Patient');
const doctorQueries = require('../../db/Doctor');

const getAllPatients = async (req, res) => {
  try {
    const patients = await patientQueries.getPatients();
    const doctors = await doctorQueries.getDoctorsIdAndName();
    res.render('Patient/index.ejs', {
      user: req.user,
      patients,
      doctors,
      message: '',
    });
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

const addNewPatient = async (req, res) => {
  const patName = req.body.patient_name;
  const patContact = req.body.patient_contact;
  const patAddress = req.body.patient_address;
  const patGender = req.body.patient_gender;
  const patAge = req.body.patient_age;
  const patInsuranceId = req.body.patient_insurance_id;
  const patDoc = req.body.patient_doctor;
  try {
    const result = await patientQueries.addNewPatient({
      patName,
      patContact,
      patAddress,
      patGender,
      patAge,
      patInsuranceId,
      patDoc,
    });
    console.log(result);
    res.redirect('/patients');
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

module.exports = { getAllPatients, addNewPatient };
