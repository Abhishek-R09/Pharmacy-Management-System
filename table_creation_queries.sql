-- Query 1 (executed)
CREATE TABLE `doctor_1` (
  `doc_id` int NOT NULL AUTO_INCREMENT,
  `doc_name` varchar(45) NOT NULL,
  `contact` varchar(13) DEFAULT NULL,
  `specialization` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doc_id`),
  UNIQUE KEY `contact_UNIQUE` (`contact`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Query 1 (executed)
CREATE TABLE `doctor_2` (
  `doc_id` int NOT NULL,
  `med_id` int NOT NULL,
  PRIMARY KEY (`doc_id`,`med_id`),
  CONSTRAINT `doctor_2_fk_doc_id` FOREIGN KEY (`doc_id`) REFERENCES `doctor_1` (`doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Query executed
CREATE TABLE `patient_1` (
  `pat_id` int NOT NULL AUTO_INCREMENT,
  `pat_name` varchar(45) NOT NULL,
  `contact` varchar(13) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `insurance_id` varchar(20) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`pat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Query executed
CREATE TABLE `patient_2` (
  `pat_id` int NOT NULL,
  `doc_id` int NOT NULL,
  PRIMARY KEY (`pat_id`,`doc_id`),
  KEY `patient_2_fk_doc_id_idx` (`doc_id`),
  CONSTRAINT `patient_2_fk_doc_id` FOREIGN KEY (`doc_id`) REFERENCES `doctor_1` (`doc_id`),
  CONSTRAINT `patient_2_fk_pat_id` FOREIGN KEY (`pat_id`) REFERENCES `patient_1` (`pat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Query executed
CREATE TABLE `bill_1` (
  `bill_no` int NOT NULL AUTO_INCREMENT,
  `payment_mode` varchar(25) NOT NULL,
  `discount` int DEFAULT NULL,
  `pat_id` int NOT NULL,
  `total_cost` int DEFAULT NULL,
  `bill_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`bill_no`),
  KEY `bill_1_fk_pat_id_idx` (`pat_id`),
  CONSTRAINT `bill_1_fk_pat_id` FOREIGN KEY (`pat_id`) REFERENCES `patient_1` (`pat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Query executed
CREATE TABLE `bill_2` (
  `bill_no` int NOT NULL,
  `quantity` int NOT NULL,
  `med_id` int NOT NULL,
  PRIMARY KEY (`bill_no`,`med_id`),
  CONSTRAINT `bill_2_1_fk_bill_no` FOREIGN KEY (`bill_no`) REFERENCES `bill_1` (`bill_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Query executed
CREATE TABLE `employee` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `emp_name` varchar(40) NOT NULL,
  `contact` varchar(13) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `username` varchar(40) NOT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Query executed
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Query executed
CREATE TABLE `drug_manufacturer` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `contact` varchar(13) NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `contact_UNIQUE` (`contact`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Query executed
CREATE TABLE `medicine` (
  `med_id` int NOT NULL AUTO_INCREMENT,
  `med_name` varchar(45) NOT NULL,
  `mrp` int NOT NULL,
  `primary_drug` varchar(45) DEFAULT NULL,
  `dosage` varchar(45) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`med_id`),
  KEY `medicine_fk_company_id_idx` (`company_id`),
  CONSTRAINT `medicine_fk_company_id` FOREIGN KEY (`company_id`) REFERENCES `drug_manufacturer` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Query executed
CREATE TABLE `inventory` (
  `stock_id` int NOT NULL AUTO_INCREMENT,
  `med_id` int NOT NULL,
  `expiry_date` date NOT NULL,
  `total_number` int NOT NULL,
  `emp_id` int NOT NULL,
  PRIMARY KEY (`stock_id`),
  KEY `inventory_fk_med_id_idx` (`med_id`),
  KEY `inventory_fk_emp_id_idx` (`emp_id`),
  CONSTRAINT `inventory_fk_emp_id` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`),
  CONSTRAINT `inventory_fk_med_id` FOREIGN KEY (`med_id`) REFERENCES `medicine` (`med_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Query executed
ALTER TABLE `pharmacy_management_system`.`doctor_2` 
ADD INDEX `doctor_2_fk_med_id_idx` (`med_id` ASC) VISIBLE;

-- Query executed
ALTER TABLE `pharmacy_management_system`.`doctor_2` 
ADD CONSTRAINT `doctor_2_fk_med_id`
  FOREIGN KEY (`med_id`)
  REFERENCES `pharmacy_management_system`.`medicine` (`med_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
-- Query executed
ALTER TABLE `pharmacy_management_system`.`bill_2` 
ADD INDEX `bill_2_fk_med_id_idx` (`med_id` ASC) VISIBLE;

-- Query executed
ALTER TABLE `pharmacy_management_system`.`bill_2` 
ADD CONSTRAINT `bill_2_fk_med_id`
  FOREIGN KEY (`med_id`)
  REFERENCES `pharmacy_management_system`.`medicine` (`med_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
-- Query executed
ALTER TABLE `pharmacy_management_system`.`employee` 
ADD INDEX `employee_fk_login_id_idx` (`username` ASC) VISIBLE;

-- Query executed
ALTER TABLE `pharmacy_management_system`.`patient_1` ADD CHECK (`gender` IN ("Male", "Female", "Others"));

-- Query executed
ALTER TABLE `pharmacy_management_system`.`bill_1` ADD CONSTRAINT
CHECK (payment_mode IN ('Credit Card','Debit Card','Cash','Online'));

-- Query executed
ALTER TABLE `pharmacy_management_system`.`employee` 
ADD CONSTRAINT `employee_fk_id_login`
  FOREIGN KEY (`username`)
  REFERENCES `pharmacy_management_system`.`login` (`username`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

-- ALTER TABLE `pharmacy_management_system`.`employee` 
-- ADD CONSTRAINT `employee_fk_login_id`
--   FOREIGN KEY (`login_id`)
--   REFERENCES `pharmacy_management_system`.`login` (`login_id`)
--   ON DELETE NO ACTION
--   ON UPDATE NO ACTION;
  
-- ALTER TABLE `pharmacy_management_system`.`drug_manufacturer` 
-- ADD UNIQUE INDEX `contact_UNIQUE` (`contact` ASC) VISIBLE;

-- ALTER TABLE `pharmacy_management_system`.`employee` 
-- DROP FOREIGN KEY `employee_fk_login_id`;

-- ALTER TABLE `pharmacy_management_system`.`employee` 
-- CHANGE COLUMN `login_id` `username` VARCHAR(40) NOT NULL ;

-- ALTER TABLE `pharmacy_management_system`.`employee` 
-- ADD CONSTRAINT `employee_fk_login_id`
--   FOREIGN KEY (`username`)
--   REFERENCES `pharmacy_management_system`.`login` (`username`);


-- ALTER TABLE `pharmacy_management_system`.`employee` 
-- DROP FOREIGN KEY `employee_fk_login_id`;

-- ALTER TABLE `pharmacy_management_system`.`employee` 
-- ADD CONSTRAINT `employee_fk_username`
--   FOREIGN KEY (`username`)
--   REFERENCES `pharmacy_management_system`.`login` (`username`);

-- ALTER TABLE `pharmacy_management_system`.`login` 
-- CHANGE COLUMN `password` `password` VARCHAR(200) NOT NULL ;

-- ALTER TABLE `pharmacy_management_system`.`login` 
-- CHANGE COLUMN `login_id` `id` INT NOT NULL AUTO_INCREMENT ;

-- ALTER TABLE `pharmacy_management_system`.`employee` 
-- DROP FOREIGN KEY `employee_fk_id_login`;

-- ALTER TABLE `pharmacy_management_system`.`employee` 
-- ADD CONSTRAINT `employee_fk_id_login`
--   FOREIGN KEY (`username`)
--   REFERENCES `pharmacy_management_system`.`login` (`username`)
--   ON DELETE CASCADE;
  
-- ALTER TABLE `pharmacy_management_system`.`bill_1` 
-- ADD COLUMN `bill_date` DATE NULL AFTER `total_cost`;

-- ALTER TABLE `pharmacy_management_system`.`employee` 
-- DROP FOREIGN KEY `employee_fk_id_login`;
