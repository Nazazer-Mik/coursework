CREATE TABLE `service_request` (
  `service_request_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `car_order_id_fk` INT NOT NULL,
  `customer_id_fk` BIGINT NOT NULL,
  `problem_reported` TEXT NOT NULL,
  `milage` INT NOT NULL,
  `pickup` TINYINT(1) NOT NULL,
  `warranty` TINYINT(1) NOT NULL,
  `status` VARCHAR(255) NOT NULL
);

CREATE TABLE `car_model` (
  `model_code` VARCHAR(255) PRIMARY KEY NOT NULL,
  `model` VARCHAR(255) NOT NULL,
  `year` YEAR NOT NULL,
  `engine_power_kw` MEDIUMINT NOT NULL,
  `battery_kwh` SMALLINT NOT NULL,
  `range_mi` INT NOT NULL,
  `top_speed_mi` SMALLINT NOT NULL,
  `driveline` VARCHAR(255) NOT NULL,
  `zero_sixty` DOUBLE(8,2) NOT NULL,
  `charging_speed` VARCHAR(255) NOT NULL,
  `towing_capacity` INT NOT NULL,
  `features` TEXT NOT NULL,
  `price` INT NOT NULL,
  `availability` INT NOT NULL
);

CREATE TABLE `charger_order` (
  `charger_order_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `customer_id_fk` BIGINT NOT NULL,
  `charger_model_code_fk` BIGINT NOT NULL,
  `delivery` TINYINT(1) NOT NULL,
  `installation` TINYINT(1) NOT NULL,
  `final_price` INT NOT NULL,
  `status` VARCHAR(255) NOT NULL
);

CREATE TABLE `car` (
  `car_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `model_code_fk` VARCHAR(255) NOT NULL,
  `color` VARCHAR(255) NOT NULL,
  `interior_color` VARCHAR(255) NOT NULL,
  `wheels` VARCHAR(255) NOT NULL,
  `towing_hitch` TINYINT(1) NOT NULL,
  `vin_code` VARCHAR(255) NOT NULL,
  `reg_number` VARCHAR(255),
  `warranty_years` TINYINT NOT NULL,
  `modifications_price` INT NOT NULL
);

CREATE TABLE `car_order` (
  `car_order_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `car_id_fk` INT NOT NULL,
  `customer_id_fk` BIGINT NOT NULL,
  `time_of_purchase` DATETIME NOT NULL,
  `delivery` TINYINT(1) NOT NULL,
  `final_price` INT NOT NULL,
  `payment_method` VARCHAR(255) NOT NULL,
  `status` VARCHAR(255) NOT NULL
);

CREATE TABLE `charger_model` (
  `model_code` BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `model` VARCHAR(255) NOT NULL,
  `connector_type` VARCHAR(255) NOT NULL,
  `charging_speed_w` BIGINT NOT NULL,
  `color` VARCHAR(255) NOT NULL,
  `length` MEDIUMINT NOT NULL,
  `serial_number` VARCHAR(255) NOT NULL,
  `price` INT NOT NULL
);

CREATE TABLE `test_drive_booking` (
  `test_drive_booking_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `booking_time` DATETIME NOT NULL,
  `model_code_fk` VARCHAR(255) NOT NULL,
  `customer_id_fk` BIGINT NOT NULL,
  `requested_on` DATETIME NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  `status_descr` TEXT NOT NULL
);

CREATE TABLE `customer` (
  `customer_id` BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `home_address` VARCHAR(255) NOT NULL,
  `user_id_fk` BIGINT NOT NULL,
  `number` VARCHAR(255) NOT NULL
);

CREATE TABLE `credentials` (
  `user_id` BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL
  `sessions_id` VARCHAR(255) NOT NULL
);

ALTER TABLE `car` ADD CONSTRAINT `car_model_code_fk_foreign` FOREIGN KEY (`model_code_fk`) REFERENCES `car_model` (`model_code`);

ALTER TABLE `car_order` ADD CONSTRAINT `car_order_customer_id_fk_foreign` FOREIGN KEY (`customer_id_fk`) REFERENCES `customer` (`customer_id`);

ALTER TABLE `car_order` ADD CONSTRAINT `car_order_car_id_fk_foreign` FOREIGN KEY (`car_id_fk`) REFERENCES `car` (`car_id`);

ALTER TABLE `service_request` ADD CONSTRAINT `service_request_customer_id_fk_foreign` FOREIGN KEY (`customer_id_fk`) REFERENCES `customer` (`customer_id`);

ALTER TABLE `test_drive_booking` ADD CONSTRAINT `test_drive_booking_customer_id_fk_foreign` FOREIGN KEY (`customer_id_fk`) REFERENCES `customer` (`customer_id`);

ALTER TABLE `service_request` ADD CONSTRAINT `service_request_car_order_id_fk_foreign` FOREIGN KEY (`car_order_id_fk`) REFERENCES `car_order` (`car_order_id`);

ALTER TABLE `charger_order` ADD CONSTRAINT `charger_order_customer_id_fk_foreign` FOREIGN KEY (`customer_id_fk`) REFERENCES `customer` (`customer_id`);

ALTER TABLE `test_drive_booking` ADD CONSTRAINT `test_drive_booking_model_code_fk_foreign` FOREIGN KEY (`model_code_fk`) REFERENCES `car_model` (`model_code`);

ALTER TABLE `customer` ADD CONSTRAINT `customer_user_id_fk_foreign` FOREIGN KEY (`user_id_fk`) REFERENCES `credentials` (`user_id`);

ALTER TABLE `charger_order` ADD CONSTRAINT `charger_order_charger_model_code_fk_foreign` FOREIGN KEY (`charger_model_code_fk`) REFERENCES `charger_model` (`model_code`);