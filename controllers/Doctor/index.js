const doctorQueries = require('../../db/Doctor');

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorQueries.getDoctorDetails();
    res.render('Doctor/index.ejs', { user: req.user, doctors });
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

const addNewDoctor = async (req, res) => {
  const docName = req.body.doctor_name;
  const docContact = req.body.doctor_contact;
  const docSpecialization = req.body.doctor_specialization;
  try {
    const result = await doctorQueries.addNewDoctor({
      docName,
      docContact,
      docSpecialization,
    });
    console.log(result);
    res.redirect('/doctors');
  } catch (error) {
    res.status(500).send(`<pre>${error}</pre><a href="/">Go to home!</a>`);
  }
};

module.exports = { getAllDoctors, addNewDoctor };
