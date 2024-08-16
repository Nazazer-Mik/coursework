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
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `car_id` int NOT NULL AUTO_INCREMENT,
  `model_code_fk` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `interior_color` varchar(255) NOT NULL,
  `wheels` varchar(255) NOT NULL,
  `towing_hitch` tinyint(1) DEFAULT NULL,
  `vin_code` varchar(255) NOT NULL,
  `reg_number` varchar(255) DEFAULT NULL,
  `warranty_years` tinyint NOT NULL,
  `modifications_price` int NOT NULL,
  `preassembled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`car_id`),
  KEY `car_model_code_fk_foreign` (`model_code_fk`),
  CONSTRAINT `car_model_code_fk_foreign` FOREIGN KEY (`model_code_fk`) REFERENCES `car_model` (`model_code`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (42,'polestar2-single-standard','Snow','Embossed Textile','R19 Aero',0,'1HGCM82633A004352','HJ24KOO',3,0,1),(43,'polestar2-single-long','Snow','Embossed Textile','R20 Pro',1,'1HGCM82633A004353','HJ24KOW',2,2000,1),(44,'polestar2-single-long','Snow','Slate WeaveTech','R20 Pro',1,'1HGCM82633A004354','HJ24KOS',2,2500,1),(45,'polestar2-dual-long','Snow','Charcoal WeaveTech','R20 Perfomance',1,'1HGCM82633A004355','HJ24KOQ',2,2500,1),(46,'polestar2-dual-long-perfomance','Snow','Slate WeaveTech','R20 Perfomance',1,'1HGCM82633A004356','HJ24KOT',1,3800,1),(47,'polestar2-single-standard','Space','Embossed Textile','R19 Aero',1,'1HGCM82633A004357','HJ24KOY',3,700,1),(48,'polestar2-single-standard','Space','Charcoal WeaveTech','R20 Pro',1,'1HGCM82633A004358','HJ24KOU',3,1200,1),(49,'polestar2-dual-long','Space','Charcoal WeaveTech','R20 Pro',1,'1HGCM82633A004359','HJ24KOI',2,2800,1),(50,'polestar2-dual-long-perfomance','Space','Charcoal WeaveTech','R20 Pro',0,'1HGCM82633A004312','HJ24KOP',1,3500,1),(51,'polestar2-single-standard','Midnight','Embossed Textile','R19 Aero',0,'1HGCM82633A004322','HJ24KOA',3,200,1),(52,'polestar2-single-long','Midnight','Embossed Textile','R20 Pro',1,'1HGCM82633A004332','HJ24KOS',2,600,1),(53,'polestar2-dual-long','Midnight','Charcoal WeaveTech','R20 Pro',1,'1HGCM82633A004342','HJ24KOD',2,1800,1),(54,'polestar2-dual-long','Midnight','Slate WeaveTech','R20 Pro',0,'1HGCM82633A004362','HJ24KOF',2,1900,1),(55,'polestar2-single-long','Thunder','Embossed Textile','R19 Aero',0,'1HGCM82633A004372','HJ24KOG',2,300,1),(56,'polestar2-dual-long','Thunder','Charcoal WeaveTech','R20 Pro',1,'1HGCM82633A004382','HJ24KOH',2,1200,1),(57,'polestar2-dual-long','Thunder','Slate WeaveTech','R20 Pro',1,'1HGCM82633A004392','HJ24KOJ',2,1300,1),(58,'polestar2-single-long','Jupiter','Embossed Textile','R19 Aero',1,'1HGCM82633A104352','HJ24KOL',2,500,1),(59,'polestar2-dual-long','Jupiter','Slate WeaveTech','R20 Pro',1,'1HGCM82633A204352','HJ24KON',2,1200,1),(60,'polestar2-dual-long','Magnesium','Charcoal WeaveTech','R20 Pro',1,'1HGCM82633A304352','HJ24KOM',2,1200,1),(61,'polestar2-dual-long','Magnesium','Slate WeaveTech','R20 Pro',1,'1HGCM82633A404352','HJ24KOB',2,1300,1),(62,'polestar3-single-long','Snow','Charcoal Nappa','R22 Perfomance',0,'1HGCM82633A224511','HJ24QOO',3,300,1),(63,'polestar3-single-long','Snow','Jupiter Nappa','R22 Perfomance',0,'1HGCM82633A224512','HJ24WOW',3,300,1),(64,'polestar3-single-long','Snow','Zinc Nappa','R22 Perfomance',1,'1HGCM82633A224513','HJ24EOS',3,400,1),(65,'polestar3-dual-long','Snow','Zinc Nappa','R22 Perfomance',1,'1HGCM82633A224514','HJ24ROQ',2,2500,1),(66,'polestar3-dual-long-perfomance','Snow','Wool','R22 Perfomance',0,'1HGCM82633A224515','HJ24TOT',1,3000,1),(67,'polestar3-single-long','Space','Jupiter Nappa','R21 Plus',0,'1HGCM82633A224516','HJ24YOY',3,200,1),(68,'polestar3-single-long','Space','Wool','R22 Sport',1,'1HGCM82633A224517','HJ24UOU',3,700,1),(69,'polestar3-dual-long','Space','MicroTech','R22 Sport',1,'1HGCM82633A224518','HJ24IOI',2,800,1),(70,'polestar3-dual-long-perfomance','Space','Zinc Nappa','R22 Perfomance',0,'1HGCM82633A224519','HJ24OOP',1,1400,1),(71,'polestar3-single-long','Midnight','Charcoal Nappa','R21 Plus',0,'1HGCM82633A224520','HJ24AOA',3,300,1),(72,'polestar3-single-long','Midnight','MicroTech','R21 Plus',1,'1HGCM82633A224521','HJ24SOS',3,700,1),(73,'polestar3-dual-long','Midnight','Zinc Nappa','R22 Sport',1,'1HGCM82633A224522','HJ24DOD',2,1600,1),(74,'polestar3-dual-long','Midnight','Jupiter Nappa','R22 Perfomance',0,'1HGCM82633A224523','HJ24FOF',2,2000,1),(75,'polestar3-single-long','Thunder','Jupiter Nappa','R21 Plus',0,'1HGCM82633A224524','HJ24GOG',3,200,1),(76,'polestar3-dual-long','Thunder','Wool','R22 Sport',1,'1HGCM82633A224525','HJ24HOH',2,750,1),(77,'polestar3-dual-long','Thunder','Zinc Nappa','R22 Perfomance',1,'1HGCM82633A224526','HJ24JOJ',2,1900,1),(78,'polestar3-dual-long','Magnesium','Charcoal Nappa','R21 Plus',0,'1HGCM82633A224527','HJ24LOM',2,550,1),(79,'polestar3-dual-long','Magnesium','Jupiter Nappa','R21 Plus',1,'1HGCM82633A224528','HJ24ZOB',2,650,1),(80,'polestar3-dual-long','Magnesium','Jupiter Nappa','R22 Perfomance',1,'1HGCM82633A224529','HJ24XOB',2,2100,1),(81,'polestar3-dual-long','Magnesium','Wool','R22 Perfomance',1,'1HGCM82633A224530','HJ24COB',2,2200,1),(82,'polestar4-single-long','Snow','Charcoal Nappa','R20 Aero',0,'2HGCM82633A004351','KJ24KOQ',3,0,1),(83,'polestar4-single-long','Snow','Zinc Nappa Leather','R20 Aero',0,'2HGCM82633A004352','KJ24KOW',3,1000,1),(84,'polestar4-single-long','Snow','MicroTech','R21 Pro',1,'2HGCM82633A004353','KJ24KOE',3,1500,1),(85,'polestar4-dual-long','Snow','MicroTech','R21 Pro',1,'2HGCM82633A004354','KJ24KOR',2,2200,1),(86,'polestar4-dual-long','Snow','Tailored Knit','R21 Pro',1,'2HGCM82633A004355','KJ24KOT',2,3900,1),(87,'polestar4-single-long','Space','Charcoal Nappa','R20 Aero',0,'2HGCM82633A004356','KJ24KOY',3,500,1),(88,'polestar4-single-long','Space','Charcoal Nappa','R21 Sport',1,'2HGCM82633A004357','KJ24KOU',3,1900,1),(89,'polestar4-dual-long','Space','Zinc Nappa Leather','R21 Pro',1,'2HGCM82633A004358','KJ24KOI',2,2900,1),(90,'polestar4-dual-long','Space','Tailored Knit','R22 Perfomance',0,'2HGCM82633A004359','KJ24KOO',2,4100,1),(91,'polestar4-single-long','Magnesium','MicroTech','R21 Pro',0,'2HGCM82633A004361','KJ24KOP',3,1100,1),(92,'polestar4-single-long','Magnesium','Tailored Knit','R21 Sport',1,'2HGCM82633A004362','KJ24KOA',3,1700,1),(93,'polestar4-single-long','Storm','Charcoal Nappa','R20 Aero',0,'2HGCM82633A004363','KJ24KOS',3,1200,1),(94,'polestar4-single-long','Storm','Charcoal Nappa','R21 Pro',1,'2HGCM82633A004364','KJ24KOD',3,1600,1),(95,'polestar4-dual-long','Storm','Tailored Knit','R21 Sport',0,'2HGCM82633A004365','KJ24KOF',2,2800,1),(96,'polestar4-dual-long','Storm','MicroTech','R22 Perfomance',1,'2HGCM82633A004366','KJ24KOG',2,2900,1),(97,'polestar4-single-long','Electron','Charcoal Nappa','R20 Aero',0,'2HGCM82633A004367','KJ24KOH',3,900,1),(98,'polestar4-single-long','Electron','MicroTech','R21 Pro',1,'2HGCM82633A004368','KJ24KOJ',3,1650,1),(99,'polestar4-dual-long','Electron','Tailored Knit','R21 Sport',1,'2HGCM82633A004369','KJ24KOK',2,2300,1),(100,'polestar4-dual-long','Electron','Zinc Nappa Leather','R22 Perfomance',1,'2HGCM82633A004370','KJ24KOL',2,4500,1),(101,'polestar4-single-long','Gold','Charcoal Nappa','R21 Pro',1,'2HGCM82633A004371','KJ24KOZ',3,1500,1),(102,'polestar4-single-long','Gold','MicroTech','R21 Pro',1,'2HGCM82633A004372','KJ24KOX',3,1600,1),(103,'polestar4-dual-long','Gold','Tailored Knit','R22 Perfomance',1,'2HGCM82633A004373','KJ24KOC',2,3500,1),(104,'polestar4-dual-long','Gold','Zinc Nappa Leather','R22 Perfomance',1,'2HGCM82633A004374','KJ24KOV',2,4800,1),(105,'polestar2-single-standard','Snow','Embossed Textile','R19 Aero',0,'1HGCG82633A004352','HG24KOO',3,0,1),(106,'polestar2-single-standard','Snow','Embossed Textile','R19 Aero',0,'1HGCB82633A004352','HB24KOO',3,0,1),(107,'polestar2-single-standard','Snow','Embossed Textile','R19 Aero',0,'1HGCH82633A004352','HH24KOO',3,0,1),(108,'polestar2-dual-long','Jupiter','Slate WeaveTech','R20 Pro',1,'1HGCG82633A204352','HG24KON',2,1200,1),(114,'polestar4-single-long','Space','Charcoal Nappa','R20 Aero',0,'3FAHP0HAXAR150104','KJ25KOA',3,500,1),(115,'polestar4-single-long','Space','Charcoal Nappa','R21 Sport',1,'5FNYF3H92FB046915','KJ25KOS',3,1900,1),(116,'polestar4-single-long','Space','Charcoal Nappa','R20 Aero',0,'5YFBU4EE7CP001231','KJ25KOD',3,500,1),(117,'polestar4-single-long','Space','Charcoal Nappa','R21 Sport',1,'WVGBV7AX8CW558030','KJ25KOF',3,1900,1),(118,'polestar4-single-long','Space','Charcoal Nappa','R20 Aero',0,'5NPDH4AE4DH374972','KJ25KOG',3,500,1),(119,'polestar4-single-long','Space','Charcoal Nappa','R21 Sport',1,'JN1HU01S1ET284464','KJ25KOH',3,1900,1),(120,'polestar4-single-long','Space','Charcoal Nappa','R20 Aero',0,'JM1GJ1V50F1274145','KJ25KOJ',3,500,1),(121,'polestar4-single-long','Space','Charcoal Nappa','R21 Sport',1,'1GNES16S946179308','KJ25KOK',3,1900,1),(122,'polestar4-single-long','Space','Charcoal Nappa','R20 Aero',0,'2B3LJ74W28H396359','KJ25KOL',3,500,1),(123,'polestar4-single-long','Space','Charcoal Nappa','R21 Sport',1,'4A4JN2AS2BE070664','KJ25KOZ',3,1900,1),(124,'polestar4-single-long','Space','Charcoal Nappa','R20 Aero',0,'2C3CDXHG0FH736361','KJ25KOX',3,500,1),(125,'polestar4-single-long','Space','Charcoal Nappa','R21 Sport',1,'1ZVHT80N085100602','KJ25KOC',3,1900,1),(126,'polestar3-single-long','Space','Jupiter Nappa','R21 Plus',0,'1GTHK23G33F295095','HJ25YQQ',3,200,1),(127,'polestar3-single-long','Space','Wool','R22 Sport',1,'1GNSKKKC6FR128857','HJ25YQW',3,700,1),(128,'polestar3-single-long','Space','Jupiter Nappa','R21 Plus',0,'3GNCA13B29S697942','HJ25YQE',3,200,1),(129,'polestar3-single-long','Space','Wool','R22 Sport',1,'WVGCB77L98D051139','HJ25YQR',3,700,1),(130,'polestar3-single-long','Space','Jupiter Nappa','R21 Plus',0,'1B3HB48B17D537295','HJ25YQT',3,200,1),(131,'polestar3-single-long','Space','Wool','R22 Sport',1,'1G2ZG58N874179752','HJ25YQY',3,700,1),(132,'polestar3-single-long','Space','Jupiter Nappa','R21 Plus',0,'1FTZX1768WNA30734','HJ25YQU',3,200,1),(133,'polestar3-single-long','Space','Wool','R22 Sport',1,'WBAVB13556KX59878','HJ25YQI',3,700,1),(134,'polestar3-single-long','Space','Jupiter Nappa','R21 Plus',0,'4T1BF1FK5DU229743','HJ25YQO',3,200,1),(135,'polestar3-single-long','Space','Wool','R22 Sport',1,'2FMDK4JC1EBA49639','HJ25YQP',3,700,1),(136,'polestar3-single-long','Space','Jupiter Nappa','R21 Plus',0,'1HGEM227X1L050874','HJ25YQA',3,200,1),(137,'polestar3-single-long','Space','Wool','R22 Sport',1,'2CNBJ634826937160','HJ25YQS',3,700,1),(138,'polestar3-single-long','Space','Jupiter Nappa','R21 Plus',0,'5UXFA93586LE97620','HJ25YQD',3,200,1),(139,'polestar3-single-long','Space','Wool','R22 Sport',1,'2G1WG5E33D1127107','HJ25YQF',3,700,1),(140,'polestar4-single-long','Gold','Charcoal Nappa','R21 Pro',1,'000000000000TEST1','00TEST1',3,1500,1),(141,'polestar4-single-long','Gold','Charcoal Nappa','R21 Pro',1,'000000000000TEST2','00TEST2',3,1500,1),(142,'polestar4-single-long','Gold','Charcoal Nappa','R21 Pro',1,'000000000000TEST3','00TEST3',3,1500,1),(146,'polestar2-single-long','Space','Slate WeaveTech','R19 Aero',1,'D3249A65A42E4483F','87242DF',3,1300,0),(150,'polestar2-dual-long-perfomance','Snow','Embossed textile','R19 Aero',0,'8F616ABBF620E5E5B','4D24ABA',3,0,0),(151,'polestar2-dual-long-perfomance','Snow','Embossed textile','R19 Aero',0,'DC778FE567C2B2E42','6C2479A',3,0,0),(152,'polestar2-dual-long-perfomance','Snow','Embossed textile','R19 Aero',0,'690BBC4EE2A9A8158','5B24C29',3,0,0),(153,'polestar2-dual-long-perfomance','Snow','Embossed textile','R19 Aero',0,'F81A5F112437FE9AC','0424383',3,0,0),(154,'polestar2-dual-long-perfomance','Snow','Embossed textile','R19 Aero',0,'B5E15436B5D917634','DD24D40',3,0,0),(155,'polestar2-dual-long-perfomance','Snow','Embossed textile','R19 Aero',0,'9CD6DD89A0532746F','B924DB7',3,0,0),(156,'polestar3-single-long','Thunder','Zinc Nappa','R22 Perfomance',1,'B8B6F911F246FE28A','8D24D80',3,3800,0);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
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