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
-- Table structure for table `car_model`
--

DROP TABLE IF EXISTS `car_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_model` (
  `model_code` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `year` year NOT NULL,
  `engine_power_kw` mediumint NOT NULL,
  `battery_kwh` smallint NOT NULL,
  `range_mi` int NOT NULL,
  `top_speed_mi` smallint NOT NULL,
  `driveline` varchar(255) NOT NULL,
  `zero_sixty` double(8,2) NOT NULL,
  `towing_capacity` int NOT NULL,
  `features` text NOT NULL,
  `price` int NOT NULL,
  `availability` int NOT NULL,
  `motor` varchar(255) NOT NULL,
  `torque` mediumint NOT NULL,
  PRIMARY KEY (`model_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_model`
--

LOCK TABLES `car_model` WRITE;
/*!40000 ALTER TABLE `car_model` DISABLE KEYS */;
INSERT INTO `car_model` VALUES ('polestar2-dual-long','Polestar 2',2024,310,82,368,127,'All-wheel drive',4.30,1500,'Electric power steering with three modes: light, standard and firm;Manually adjustable steering column;2-piston aluminium brakes, 345x30 mm (front) and 340x20 mm (rear) ventilated discs;Swedish gold Brembo four-piston fixed aluminium front calipers with drilled ventilated discs (with Performance pack);Twin tube, single-flow valve shock absorbers Suspension;Turning circle 11,5 m',52950,170,'Dual Motor',740),('polestar2-dual-long-perfomance','Polestar 2',2024,350,82,352,127,'All-wheel drive',4.00,1500,'Electric power steering with three modes: light, standard and firm;Swedish gold Brembo four-piston fixed aluminium front calipers with drilled ventilated discs (with Performance pack;Ohlins Dual Flow Valve (DFV) Manually adjustable dampers (22 Settings) front and rear (with Performance pack);Turning circle 11,5 m',57950,40,'Dual Motor Perfomance',740),('polestar2-single-long','Polestar 2',2024,220,82,406,127,'Rear-wheel drive',5.90,1500,'Manually adjustable steering column;2-piston aluminium brakes, 345x30 mm (front) and 340x20 mm (rear) ventilated discs;Swedish gold Brembo four-piston fixed aluminium front calipers with drilled ventilated discs (with Performance pack;Twin tube, single-flow valve shock absorbers Suspension;Turning circle 11,5 m',48950,153,'Single Motor',490),('polestar2-single-standard','Polestar 2',2024,200,69,339,127,'Rear-wheel drive',6.20,1500,'Manually adjustable steering column;Swedish gold Brembo four-piston fixed aluminium front calipers with drilled ventilated discs (with Performance pack;McPherson strut (front), Multi-link (rear) Suspension;Turning circle 11,5 m',44950,179,'Single Motor',490),('polestar3-dual-long','Polestar 3',2024,360,111,392,130,'All-wheel drive',4.80,2200,'Electric power steering with three modes: standard, firm and light;All-wheel drive with all single motor variants;Aluminium 4-piston anodised brake callipers, with ventilated 400-mm discs (Swedish gold callipers with Performance pack);Dynamic chassis for Long range Dual motor variants;Double wishbone front suspension;Integral link rear suspension;Dual chamber active air suspension with standard, nimble, and firm settings, loading mode, and automatic ride height adjustment to optimise aerodynamics (Long range Dual motor);Turning circle 11.8 m (kerb to kerb)',75900,40,'Dual Motor',840),('polestar3-dual-long-perfomance','Polestar 3',2024,380,111,348,130,'All-wheel drive',4.50,2200,'Electric power steering with three modes: standard, firm and light;All-wheel drive with all single motor variants;Brake-by-wire system with Brembo performance brakes;Polestar Engineered chassis tuning (with Performance pack);Double wishbone front suspension;Integral link rear suspension;Dual chamber active air suspension with standard, nimble, and firm settings, loading mode, and automatic ride height adjustment to optimise aerodynamics (Long range Dual motor);Turning circle 11.8 m (kerb to kerb)',81500,11,'Dual Motor Perfomance',910),('polestar3-single-long','Polestar 3',2024,220,111,403,112,'Rear-wheel drive',7.50,1500,'Power-operated steering column;Rear-wheel drive with all single motor variants;Standard anodised brake callipers, with ventilated 390-mm discs (Swedish gold callipers with Performance pack);Passive chassis for Long range Single motor variant;Double wishbone front suspension;Integral link rear suspension;Turning circle 11.8 m (kerb to kerb)',69900,22,'Single Motor',490),('polestar4-dual-long','Polestar 4',2024,200,100,367,124,'All-wheel drive',3.70,2000,'Electric power steering with three modes: light, standard, and firm;Brakes: 364 x 30 mm (front) and 350 x 26 mm (rear) ventilated discs with 2 x 45 mm-piston aluminium callipers;Polestar Engineered chassis tuning;Suspension: Continuously controlled active ZF dampers with coil spring suspension (CCD) equipped with internal valve and rebound coil springs and external coil springs;Turning circle (kerb to kerb) 11.64 m',66990,10,'Dual Motor',506),('polestar4-single-long','Polestar 4',2024,200,100,385,124,'Rear-wheel drive',6.90,1500,'Manually adjustable steering column;Brakes: 364 x 30 mm (front) and 350 x 26 mm (rear) ventilated discs with 2 x 43 mm-piston aluminium callipers;Standard dynamic chassis;Suspension: High-capacity passive dampers with internal rebound coil springs, combined with external coil springs;Turning circle (kerb to kerb) 11.64 m',59990,34,'Single Motor',253);
/*!40000 ALTER TABLE `car_model` ENABLE KEYS */;
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
