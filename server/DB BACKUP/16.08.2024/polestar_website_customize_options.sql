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
-- Table structure for table `customize_options`
--

DROP TABLE IF EXISTS `customize_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customize_options` (
  `option_id` int NOT NULL AUTO_INCREMENT,
  `model` varchar(255) NOT NULL,
  `option_type` varchar(255) NOT NULL,
  `option_name` varchar(255) DEFAULT NULL,
  `price` bigint NOT NULL,
  PRIMARY KEY (`option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customize_options`
--

LOCK TABLES `customize_options` WRITE;
/*!40000 ALTER TABLE `customize_options` DISABLE KEYS */;
INSERT INTO `customize_options` VALUES (1,'Polestar 2','color','Snow',0),(2,'Polestar 2','color','Space',500),(3,'Polestar 2','color','Midnight',300),(4,'Polestar 2','color','Thunder',200),(6,'Polestar 2','color','Jupiter',300),(7,'Polestar 3','color','Snow',0),(8,'Polestar 3','color','Space',700),(9,'Polestar 3','color','Midnight',300),(10,'Polestar 3','color','Thunder',400),(12,'Polestar 4','color','Snow',0),(13,'Polestar 4','color','Space',1000),(14,'Polestar 4','color','Magnesium',300),(15,'Polestar 4','color','Gold',2000),(16,'Polestar 4','color','Electron',800),(17,'Polestar 4','color','Storm',600),(18,'Polestar 2','interior_color','Embossed textile',0),(19,'Polestar 2','interior_color','Charcoal WeaveTech',500),(20,'Polestar 2','interior_color','Slate WeaveTech',600),(21,'Polestar 3','interior_color','MicroTech',0),(22,'Polestar 3','interior_color','Charcoal Nappa',300),(23,'Polestar 3','interior_color','Jupiter Nappa',700),(24,'Polestar 3','interior_color','Zinc Nappa',1000),(25,'Polestar 3','interior_color','Wool',500),(26,'Polestar 4','interior_color','MicroTech',0),(27,'Polestar 4','interior_color','Charcoal Nappa',500),(28,'Polestar 4','interior_color','Zinc Nappa Leather',1500),(29,'Polestar 4','interior_color','Tailored Knit',2000),(30,'Polestar 2','wheels','R19 Aero',0),(31,'Polestar 2','wheels','R20 Pro',850),(33,'Polestar 3','wheels','R21 Plus',0),(34,'Polestar 3','wheels','R22 Sport',900),(35,'Polestar 3','wheels','R22 Perfomance',2100),(36,'Polestar 4','wheels','R20 Aero',0),(37,'Polestar 4','wheels','R21 Sport',500),(38,'Polestar 4','wheels','R21 Pro',750),(39,'Polestar 4','wheels','R22 Perfomance',2200),(40,'Polestar 2','towing_hitch','Yes',200),(41,'Polestar 3','towing_hitch','Yes',300),(42,'Polestar 4','towing_hitch','Yes',400),(43,'Polestar 3','color','Magnesium',100),(44,'Polestar 2','wheels','R20 Perfomance',1600),(45,'Polestar 2','color','Magnesium',0);
/*!40000 ALTER TABLE `customize_options` ENABLE KEYS */;
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
