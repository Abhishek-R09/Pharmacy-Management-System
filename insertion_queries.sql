
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

-- inserting into employee
INSERT INTO `pharmacy_management_system`.`employee`(`emp_name`,`contact`,`address`,`dob`,`username`)
VALUES("Admin","8163667331","72, RahimGarh, Ranchi - 516473",STR_TO_DATE('01,01,2000','%d,%m,%Y'),"admin");

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
INSERT INTO `pharmacy_management_system`.`medicine`(`med_name`,`mrp`,`primary_drug`,`dosage`,`company_id`)
VALUES("Metkevenya","320","Juxinycin","4 tablet per week",2);

-- inserting into inventory
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (1,STR_TO_DATE('10,05,2022','%d,%m,%Y'),50,1);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (10,STR_TO_DATE('15,09,2023','%d,%m,%Y'),25,1);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (12,STR_TO_DATE('14,10,2024','%d,%m,%Y'),75,1);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (8,STR_TO_DATE('21,06,2025','%d,%m,%Y'),50,1);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (4,STR_TO_DATE('19,01,2026','%d,%m,%Y'),10,1);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (2,STR_TO_DATE('30,10,2027','%d,%m,%Y'),20,1);
INSERT INTO `pharmacy_management_system`.`inventory`(`med_id`,`expiry_date`,`total_number`,`emp_id`)
VALUES (9,STR_TO_DATE('24,11,2028','%d,%m,%Y'),50,1);

-- inserting into bill_1
INSERT INTO `pharmacy_management_system`.`bill_1`(`payment_mode`,`discount`,`pat_id`,`total_cost`)
VALUES("Credit Card",10,1,103);
INSERT INTO `pharmacy_management_system`.`bill_1`(`payment_mode`,`discount`,`pat_id`,`total_cost`)
VALUES("Debit Card",0,2,1050);
INSERT INTO `pharmacy_management_system`.`bill_1`(`payment_mode`,`discount`,`pat_id`,`total_cost`)
VALUES("Credit Card",15,3,150);
INSERT INTO `pharmacy_management_system`.`bill_1`(`payment_mode`,`discount`,`pat_id`,`total_cost`)
VALUES("Cash",25,4,10000);
INSERT INTO `pharmacy_management_system`.`bill_1`(`payment_mode`,`discount`,`pat_id`,`total_cost`)
VALUES("Online",5,5,5000);
INSERT INTO `pharmacy_management_system`.`bill_1`(`payment_mode`,`discount`,`pat_id`,`total_cost`)
VALUES("Credit Card",12,6,600);
INSERT INTO `pharmacy_management_system`.`bill_1`(`payment_mode`,`discount`,`pat_id`,`total_cost`)
VALUES("Debit Card",15,7,200);
INSERT INTO `pharmacy_management_system`.`bill_1`(`payment_mode`,`discount`,`pat_id`,`total_cost`)
VALUES("Cash",25,8,9000);

-- inserting into bill_2
INSERT INTO `pharmacy_management_system`.`bill_2`(`bill_no`,`quantity`,`med_id`)
VALUES(1,3,1);
INSERT INTO `pharmacy_management_system`.`bill_2`(`bill_no`,`quantity`,`med_id`)
VALUES(2,2,2);
INSERT INTO `pharmacy_management_system`.`bill_2`(`bill_no`,`quantity`,`med_id`)
VALUES(3,6,3);
INSERT INTO `pharmacy_management_system`.`bill_2`(`bill_no`,`quantity`,`med_id`)
VALUES(4,13,7);
INSERT INTO `pharmacy_management_system`.`bill_2`(`bill_no`,`quantity`,`med_id`)
VALUES(5,30,5);
INSERT INTO `pharmacy_management_system`.`bill_2`(`bill_no`,`quantity`,`med_id`)
VALUES(6,25,4);
INSERT INTO `pharmacy_management_system`.`bill_2`(`bill_no`,`quantity`,`med_id`)
VALUES(7,15,7);
INSERT INTO `pharmacy_management_system`.`bill_2`(`bill_no`,`quantity`,`med_id`)
VALUES(8,10,5);

-- insterting into doctor_2
INSERT INTO `pharmacy_management_system`.`doctor_2`(`doc_id`,`med_id`)
VALUES(1,2);
INSERT INTO `pharmacy_management_system`.`doctor_2`(`doc_id`,`med_id`)
VALUES(1,3);
INSERT INTO `pharmacy_management_system`.`doctor_2`(`doc_id`,`med_id`)
VALUES(1,5);
INSERT INTO `pharmacy_management_system`.`doctor_2`(`doc_id`,`med_id`)
VALUES(2,5);
INSERT INTO `pharmacy_management_system`.`doctor_2`(`doc_id`,`med_id`)
VALUES(3,2);
INSERT INTO `pharmacy_management_system`.`doctor_2`(`doc_id`,`med_id`)
VALUES(4,2);
INSERT INTO `pharmacy_management_system`.`doctor_2`(`doc_id`,`med_id`)
VALUES(5,2);
INSERT INTO `pharmacy_management_system`.`doctor_2`(`doc_id`,`med_id`)
VALUES(4,4);
INSERT INTO `pharmacy_management_system`.`doctor_2`(`doc_id`,`med_id`)
VALUES(5,9);
INSERT INTO `pharmacy_management_system`.`doctor_2`(`doc_id`,`med_id`)
VALUES(2,11);

-- inserting into patient_2
INSERT INTO `pharmacy_management_system`.`patient_2`(`pat_id`,`doc_id`)
VALUES(1,2);
INSERT INTO `pharmacy_management_system`.`patient_2`(`pat_id`,`doc_id`)
VALUES(2,3);
INSERT INTO `pharmacy_management_system`.`patient_2`(`pat_id`,`doc_id`)
VALUES(3,4);
INSERT INTO `pharmacy_management_system`.`patient_2`(`pat_id`,`doc_id`)
VALUES(4,1);
INSERT INTO `pharmacy_management_system`.`patient_2`(`pat_id`,`doc_id`)
VALUES(5,1);
INSERT INTO `pharmacy_management_system`.`patient_2`(`pat_id`,`doc_id`)
VALUES(6,5);
INSERT INTO `pharmacy_management_system`.`patient_2`(`pat_id`,`doc_id`)
VALUES(7,5);
INSERT INTO `pharmacy_management_system`.`patient_2`(`pat_id`,`doc_id`)
VALUES(8,5);
INSERT INTO `pharmacy_management_system`.`patient_2`(`pat_id`,`doc_id`)
VALUES(9,3);
INSERT INTO `pharmacy_management_system`.`patient_2`(`pat_id`,`doc_id`)
VALUES(10,1);
