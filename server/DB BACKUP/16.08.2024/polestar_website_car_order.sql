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
-- Table structure for table `car_order`
--

DROP TABLE IF EXISTS `car_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_order` (
  `car_order_id` int NOT NULL AUTO_INCREMENT,
  `car_id_fk` int NOT NULL,
  `customer_id_fk` bigint NOT NULL,
  `time_of_purchase` datetime DEFAULT NULL,
  `delivery` tinyint(1) NOT NULL,
  `final_price` int NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`car_order_id`),
  KEY `car_order_customer_id_fk_foreign` (`customer_id_fk`),
  KEY `car_order_car_id_fk_foreign` (`car_id_fk`),
  CONSTRAINT `car_order_car_id_fk_foreign` FOREIGN KEY (`car_id_fk`) REFERENCES `car` (`car_id`),
  CONSTRAINT `car_order_customer_id_fk_foreign` FOREIGN KEY (`customer_id_fk`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_order`
--

LOCK TABLES `car_order` WRITE;
/*!40000 ALTER TABLE `car_order` DISABLE KEYS */;
INSERT INTO `car_order` VALUES (2,105,1,'2024-07-05 00:00:00',1,46700,'Cash','Completed'),(3,106,1,'2024-07-24 00:00:00',0,45200,'Mastercard Credit','Completed'),(4,107,1,'2024-08-02 00:00:00',1,44950,'Visa Credit','Completed'),(5,108,2,'2024-06-01 00:00:00',1,57150,'Visa Debit','Rejected'),(6,114,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Completed'),(7,115,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Completed'),(8,116,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Completed'),(9,117,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Completed'),(10,118,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Completed'),(11,119,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Completed'),(12,120,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Completed'),(13,121,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Completed'),(14,122,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Cancelled'),(15,123,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Completed'),(16,124,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Completed'),(17,125,1,'2024-01-01 00:00:00',1,57150,'Visa Credit','Completed'),(18,126,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(19,127,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(20,128,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(21,129,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(22,130,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(23,131,2,'2024-03-08 00:00:00',0,57150,'Cash','Confirmed'),(24,132,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(25,133,2,'2024-03-08 00:00:00',0,57150,'Cash','Rejected'),(26,134,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(27,135,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(28,136,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(29,137,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(30,138,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(31,139,2,'2024-03-08 00:00:00',0,57150,'Cash','Completed'),(37,146,1,'2024-08-05 14:03:29',1,50250,'Cash','Awaiting confirmation'),(42,154,1,'2024-08-06 12:19:36',1,57950,'Visa Debit','Awaiting confirmation'),(44,156,2,'2024-08-16 00:21:01',1,73700,'Visa Debit','Awaiting confirmation');
/*!40000 ALTER TABLE `car_order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:27:04
