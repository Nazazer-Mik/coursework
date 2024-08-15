-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: polestar_website
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `test_drive_booking`
--

DROP TABLE IF EXISTS `test_drive_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_drive_booking` (
  `test_drive_booking_id` int NOT NULL AUTO_INCREMENT,
  `booking_time` datetime NOT NULL,
  `model_code_fk` varchar(255) NOT NULL,
  `customer_id_fk` bigint NOT NULL,
  `requested_on` datetime NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`test_drive_booking_id`),
  KEY `test_drive_booking_customer_id_fk_foreign` (`customer_id_fk`),
  KEY `test_drive_booking_model_code_fk_foreign` (`model_code_fk`),
  CONSTRAINT `test_drive_booking_customer_id_fk_foreign` FOREIGN KEY (`customer_id_fk`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `test_drive_booking_model_code_fk_foreign` FOREIGN KEY (`model_code_fk`) REFERENCES `car_model` (`model_code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_drive_booking`
--

LOCK TABLES `test_drive_booking` WRITE;
/*!40000 ALTER TABLE `test_drive_booking` DISABLE KEYS */;
INSERT INTO `test_drive_booking` VALUES (1,'2024-08-10 12:00:00','polestar3-dual-long-perfomance',1,'2024-08-09 17:27:30','New'),(2,'2024-08-10 09:00:00','polestar3-dual-long-perfomance',1,'2024-08-09 17:31:59','New'),(3,'2024-08-11 15:00:00','polestar3-dual-long-perfomance',1,'2024-08-09 18:23:56','Confirmed'),(4,'2024-08-30 12:00:00','polestar2-single-standard',1,'2024-08-10 12:12:52','Confirmed'),(5,'2024-08-27 09:00:00','polestar2-dual-long',1,'2024-08-10 12:13:47','Awaiting confirmation');
/*!40000 ALTER TABLE `test_drive_booking` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:27:05
