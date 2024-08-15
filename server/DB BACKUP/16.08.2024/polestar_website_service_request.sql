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
-- Table structure for table `service_request`
--

DROP TABLE IF EXISTS `service_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_request` (
  `service_request_id` int NOT NULL AUTO_INCREMENT,
  `car_order_id_fk` int NOT NULL,
  `customer_id_fk` bigint NOT NULL,
  `problem_reported` text NOT NULL,
  `milage` int NOT NULL,
  `pickup` tinyint(1) NOT NULL,
  `warranty` tinyint(1) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`service_request_id`),
  KEY `service_request_customer_id_fk_foreign` (`customer_id_fk`),
  KEY `service_request_car_order_id_fk_foreign` (`car_order_id_fk`),
  CONSTRAINT `service_request_car_order_id_fk_foreign` FOREIGN KEY (`car_order_id_fk`) REFERENCES `car_order` (`car_order_id`),
  CONSTRAINT `service_request_customer_id_fk_foreign` FOREIGN KEY (`customer_id_fk`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_request`
--

LOCK TABLES `service_request` WRITE;
/*!40000 ALTER TABLE `service_request` DISABLE KEYS */;
INSERT INTO `service_request` VALUES (3,5,1,'While driving my Polestar 2, I experienced a sudden and severe issue that seems to be related to the axle or suspension. The symptoms are as follows:\n- Unusual Noise: There is a loud clunking noise coming from the front of the vehicle, especially noticeable when driving over uneven surfaces or making turns.\n- Vibration: The car exhibits significant vibrations, which are felt through the steering wheel and the floor.\n- Handling: The vehicle\'s handling has deteriorated, with a noticeable pull to one side, and it feels unstable at higher speeds.\n- Visible Damage: Upon visual inspection, there appears to be damage or misalignment in the front suspension components.',2000,1,1,'Completed'),(4,37,1,'I am experiencing a serious issue with the batteries of my Polestar 2. The symptoms are as follows:\n- Rapid Battery Drain: The battery level drops significantly faster than usual, even during short drives and without the use of high-consumption features like heating or air conditioning.\n- Charging Issues: The vehicle is having difficulty charging. It either takes much longer than usual to charge, or it fails to charge completely.\n- Error Messages: The dashboard displays frequent error messages related to the battery system, including warnings about the battery health and charging system.\n- Reduced Range: The estimated driving range has decreased substantially, and the car does not achieve the expected range based on the battery percentage.\n- Unusual Heat: The battery pack seems to be generating excessive heat during both charging and normal operation, which is unusual and concerning.',180,0,0,'Waiting for parts'),(5,9,1,'I am experiencing a significant issue with the built-in screen in the interior of my Polestar 2. The symptoms are as follows:\n\n- Unresponsive Screen: The touchscreen frequently becomes unresponsive, failing to register taps and swipes accurately, making it difficult to navigate through menus and control functions.\n- Screen Flickering: There is noticeable flickering on the screen, which disrupts visibility and usage. This issue is intermittent but occurs frequently enough to be concerning.\n- System Crashes: The infotainment system crashes randomly, causing the screen to go blank or reboot unexpectedly. This affects the use of navigation, entertainment, and other essential functions.\n- Lagging Performance: The screen response is slow, with considerable lag between input and action. This includes delays in launching apps, switching between screens, and responding to user commands.\n- Display Issues: There are occasional display issues, such as distorted graphics, incorrect color rendering, or portions of the screen not displaying correctly.',1050,1,1,'New'),(6,27,1,'I experienced the issue with steering and want to request support.',300,1,0,'New'),(7,20,1,'I am reaching out to schedule an urgent repair for my Polestar 3, as I have recently encountered a significant issue with the steering system.\nOver the past few days, I’ve noticed that the steering has become increasingly unresponsive and seems to drift slightly to one side, even when the wheel is centered. This issue has made driving feel unstable, and I\'m concerned about the safety and drivability of the vehicle.',400,1,0,'New'),(8,20,1,'I’m writing to request a repair appointment for my Polestar 3 due to an issue with the headlights. Over the past few days, I’ve noticed that the headlights are not functioning as expected. Specifically, one of the headlights intermittently flickers and occasionally fails to turn on at all, which has made nighttime driving particularly challenging and unsafe.',410,0,1,'New'),(9,42,1,'I am contacting you regarding a problem I’ve encountered with the touchscreen on the dashboard of my Polestar 2. Recently, the touchscreen has become unresponsive, with delayed reactions to touch inputs and, at times, completely freezing or shutting down unexpectedly. This issue is making it difficult to access essential features and controls while driving, which is quite concerning.\nI would like to schedule a repair appointment as soon as possible to address this issue. If the touchscreen requires a software update or hardware replacement, please let me know what steps will be involved.',250,1,1,'New');
/*!40000 ALTER TABLE `service_request` ENABLE KEYS */;
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
