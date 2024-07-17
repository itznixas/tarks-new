-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	8.0.17


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema piscis
--

CREATE DATABASE IF NOT EXISTS piscis;
USE piscis;

--
-- Definition of table `tblpiscinas`
--

DROP TABLE IF EXISTS `tblpiscinas`;
CREATE TABLE `tblpiscinas` (
  `idPiscina` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nomPiscina` varchar(32) DEFAULT NULL,
  `tamPiscina` double DEFAULT NULL,
  `capPiscina` double DEFAULT NULL,
  `especiePiscina` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`idPiscina`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tblpiscinas`
--

/*!40000 ALTER TABLE `tblpiscinas` DISABLE KEYS */;
INSERT INTO `tblpiscinas` (`idPiscina`,`nomPiscina`,`tamPiscina`,`capPiscina`,`especiePiscina`) VALUES 
 (1,'Piscina principal',500,3000,'Tilapia'),
 (2,'Piscina auxiliar',300,2000,'Bocachico');
/*!40000 ALTER TABLE `tblpiscinas` ENABLE KEYS */;


--
-- Definition of table `tblregtemp`
--
use piscis;
DROP TABLE IF EXISTS `tblregtemp`;
CREATE TABLE `tblregtemp` (
  `idLecturaTemp` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idSensorTemp` int(10) unsigned DEFAULT NULL,
  `tmpUnixRegTemp` int(11) DEFAULT NULL,
  `valTemp` decimal(4,0) DEFAULT NULL,
  `valPh` decimal(4,0) DEFAULT NULL,
  `valOxig` decimal(4,0) DEFAULT NULL,
  PRIMARY KEY (`idLecturaTemp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-
--
-- Dumping data for table `tblregtemp`
--

/*!40000 ALTER TABLE `tblregtemp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblregtemp` ENABLE KEYS */;


--
-- Definition of table `tblsensores`
--

DROP TABLE IF EXISTS `tblsensores`;
CREATE TABLE `tblsensores` (
  `idSensor` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nomSensor` varchar(32) NOT NULL,
  `tipoSensor` varchar(32) NOT NULL,
  `intervSensor` int(10) unsigned NOT NULL,
  `marcaSensor` varchar(32) NOT NULL,
  `ubicSensor` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idSensor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tblsensores`
--

/*!40000 ALTER TABLE `tblsensores` DISABLE KEYS */;
INSERT INTO `tblsensores` (`idSensor`,`nomSensor`,`tipoSensor`,`intervSensor`,`marcaSensor`,`ubicSensor`) VALUES 
 (1,'28A6A646D4D4348D','Digital ',10,'Dallas DS18B20',1),
 (2,'Sensor Auxiliar','Analógico',15,'LM350',2);
/*!40000 ALTER TABLE `tblsensores` ENABLE KEYS */;

select * from tblregtemp;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
