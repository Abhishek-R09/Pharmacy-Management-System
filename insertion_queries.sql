
-- Inserting into doctor_1
INSERT INTO `pharmacy_management_system`.`doctor_1`(`doc_name`,`contact`,`specialization`)
VALUES ("Abhishek Ramgirkar","1234567890","Cardiology");
INSERT INTO `pharmacy_management_system`.`doctor_1`(`doc_name`,`contact`,`specialization`)
VALUES ("Ranjit Gandhi","4567890123","Radiology");
INSERT INTO `pharmacy_management_system`.`doctor_1`(`doc_name`,`contact`,`specialization`)
VALUES ("Siddharth Modi","1237890456","Opthalmology");
INSERT INTO `pharmacy_management_system`.`doctor_1`(`doc_name`,`contact`,`specialization`)
VALUES ("Kamla Harris","1278903456","Oncology");
INSERT INTO `pharmacy_management_system`.`doctor_1`(`doc_name`,`contact`,`specialization`)
VALUES ("Rahul Gandhi","5678901234","Neurology");


-- drug manufacturer
INSERT INTO `pharmacy_management_system`.`drug_manufacturer`(`name`,`contact`)
VALUES("Ranbaxy","6029111180");
INSERT INTO `pharmacy_management_system`.`drug_manufacturer`(`name`,`contact`)
VALUES("Sun Pharmaceutical","7873274667");
INSERT INTO `pharmacy_management_system`.`drug_manufacturer`(`name`,`contact`)
VALUES("Cipla Limited","9375326206");
INSERT INTO `pharmacy_management_system`.`drug_manufacturer`(`name`,`contact`)
VALUES("Abbott","3436587348");
INSERT INTO `pharmacy_management_system`.`drug_manufacturer`(`name`,`contact`)
VALUES("Dr. Reddy’s Laboratories","8116889621");
INSERT INTO `pharmacy_management_system`.`drug_manufacturer`(`name`,`contact`)
VALUES("Cadila Healthcare","8738706469");
INSERT INTO `pharmacy_management_system`.`drug_manufacturer`(`name`,`contact`)
VALUES("Biocon Limited","5192738457");

-- patient_1

INSERT INTO `pharmacy_management_system`.`patient_1`(`pat_name`,`contact`,`gender`,`insurance_id`,`age`,`address`)
VALUES("Balaji Chandra","4404258095","Male","CDR8RTSSC9",42,"22, Charu Heights, Hadapsar Bhubhaneshwar - 140503");
INSERT INTO `pharmacy_management_system`.`patient_1`(`pat_name`,`contact`,`gender`,`insurance_id`,`age`,`address`)
VALUES("Yadu Sagar","9934489221","Male","8CQQJB96AU",12,"22, Charu Heights, Hadapsar Bhubhaneshwar - 140503");
INSERT INTO `pharmacy_management_system`.`patient_1`(`pat_name`,`contact`,`gender`,`insurance_id`,`age`,`address`)
VALUES("Hari Mukhopadhyay","9167616923","Male","3Q9SX9DI0K",54,"61, Chhavi Chowk, Kanpur - 486638");
INSERT INTO `pharmacy_management_system`.`patient_1`(`pat_name`,`contact`,`gender`,`insurance_id`,`age`,`address`)
VALUES("Madhu Kar","1665735754","Female","K5FKGCVD2B",16,"42, Suresh Nagar, Meerut - 129993");
INSERT INTO `pharmacy_management_system`.`patient_1`(`pat_name`,`contact`,`gender`,`insurance_id`,`age`,`address`)
VALUES("Pradeep Rao Biyani","5867510581","Others","LOUCDEK5AC",69,"78, Ramesh Villas, ViratGarh Gandhinagar - 531145");
INSERT INTO `pharmacy_management_system`.`patient_1`(`pat_name`,`contact`,`gender`,`insurance_id`,`age`,`address`)
VALUES("Radhika Buch","4950601987","Female","V29bill_1PMYCYQW",31,"76, Kormangala, Kanpur - 299187");
INSERT INTO `pharmacy_management_system`.`patient_1`(`pat_name`,`contact`,`gender`,`insurance_id`,`age`,`address`)
VALUES("Sabina Chauhan","7758898172","Female","1M1FGY3J1C",28,"40, Naina Society, Satish Nagar Surat - 577788");
INSERT INTO `pharmacy_management_system`.`patient_1`(`pat_name`,`contact`,`gender`,`insurance_id`,`age`,`address`)
VALUES("Balaji Vyas ","9214536446","Male","E2Z9VIOLLF",92,"28, Tushar Heights, SahilPur Pune - 154228");
INSERT INTO `pharmacy_management_system`.`patient_1`(`pat_name`,`contact`,`gender`,`insurance_id`,`age`,`address`)
VALUES("Mridula Tabeed Shetty ","8664052988","Female","SJ7AZU5N01",45,"56, Hadapsar, Jaipur - 232155");
INSERT INTO `pharmacy_management_system`.`patient_1`(`pat_name`,`contact`,`gender`,`insurance_id`,`age`,`address`)
VALUES("Meghana Ratan Thaker","5384456729","Female","GA23Z79269",38,"78, Chirag Chowk, Noida - 194914");

-- inserting into login
INSERT INTO `pharmacy_management_system`.`login`(`username`,`password`,`role`)
VALUES("Abhi", "Abhi123", "Admin");
INSERT INTO `pharmacy_management_system`.`login`(`username`,`password`,`role`)
VALUES("Gato", "Gato123", "Cashier");
INSERT INTO `pharmacy_management_system`.`login`(`username`,`password`,`role`)
VALUES("Sid", "Sid123", "Cashier");

-- inserting into employee
INSERT INTO `pharmacy_management_system`.`employee`(`emp_name`,`contact`,`address`,`dob`,`username`)
VALUES("Abhishek Ramasubramanian","8163667331","72, RahimGarh, Ranchi - 516473",STR_TO_DATE('09,11,2001','%d,%m,%Y'),"Abhi");
INSERT INTO `pharmacy_management_system`.`employee`(`emp_name`,`contact`,`address`,`dob`,`username`)
VALUES("Siddharth Gandhi","5340037537","69, Kormangala, Patna - 269720",STR_TO_DATE('24,11,2001','%d,%m,%Y'),"Sid");
INSERT INTO `pharmacy_management_system`.`employee`(`emp_name`,`contact`,`address`,`dob`,`username`)
VALUES("Atharva Ramgirkar","6246368063","34, Yash Heights, VarunPur Bhubhaneshwar - 419838",STR_TO_DATE('10,05,2001','%d,%m,%Y'),"Gato");

-- inserting into medicine

INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Lansoprazole","120","Amoxicillin","2 tablets per day",1);
INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Hydrochlorothiazide","56","Myalept","3 tablets per day",2);
INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Benzonatate","60","Ravicti","2 tablets per day",3);
INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Coronil","2040","Mavenclad","5ml per day",4);
INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Xanax","904","Actimmune","10ml per day",5);
INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Wellbutrin","4096","Oxervate","5 tablets per week",6);
INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Viagra","420","Takhzyro","1 tablet per month",7);
INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Metoprolol","804","Daraprim","1 tablet per day",4);
INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Kevzara","36","Juxtapid","3 tablets per week",2);
INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Metformin","1118","Cinryze","10ml per month",3);
INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Gilenya","917","Clindamycin","1 tablet per month",7);

-- inserting into inventory
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (1,STR_TO_DATE('10,05,2022','%d,%m,%Y'),50,1);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (10,STR_TO_DATE('15,09,2023','%d,%m,%Y'),25,2);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (12,STR_TO_DATE('14,10,2024','%d,%m,%Y'),75,3);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (8,STR_TO_DATE('21,06,2025','%d,%m,%Y'),50,1);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (4,STR_TO_DATE('19,01,2026','%d,%m,%Y'),10,2);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (2,STR_TO_DATE('30,10,2027','%d,%m,%Y'),20,3);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (9,STR_TO_DATE('24,11,2028','%d,%m,%Y'),50,1);




