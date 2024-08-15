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
-- Table structure for table `charger_order`
--

DROP TABLE IF EXISTS `charger_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `charger_order` (
  `charger_order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id_fk` bigint NOT NULL,
  `charger_id_fk` bigint DEFAULT NULL,
  `delivery` tinyint(1) NOT NULL,
  `installation` tinyint(1) NOT NULL,
  `final_price` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `time_of_purchase` datetime NOT NULL,
  PRIMARY KEY (`charger_order_id`),
  KEY `charger_order_customer_id_fk_foreign` (`customer_id_fk`),
  KEY `charger_order_charger_id_fk_foreign` (`charger_id_fk`),
  CONSTRAINT `charger_order_charger_id_fk_foreign` FOREIGN KEY (`charger_id_fk`) REFERENCES `charger_model` (`charger_id`),
  CONSTRAINT `charger_order_customer_id_fk_foreign` FOREIGN KEY (`customer_id_fk`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charger_order`
--

LOCK TABLES `charger_order` WRITE;
/*!40000 ALTER TABLE `charger_order` DISABLE KEYS */;
INSERT INTO `charger_order` VALUES (1,1,2,1,1,550,'Completed','0000127669','2024-06-01 00:00:00'),(2,2,4,0,0,800,'Awaiting confirmation','0000127670','2024-06-08 00:00:00'),(3,1,3,1,0,600,'Completed','0000127671','2024-06-28 00:00:00'),(7,1,4,0,1,870,'Cancelled','fd37beb758','2024-08-06 19:48:17');
/*!40000 ALTER TABLE `charger_order` ENABLE KEYS */;
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
