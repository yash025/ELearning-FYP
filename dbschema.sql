CREATE database elearning;

CREATE TABLE `user` (
  `Email` varchar(255) NOT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Points` int DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `completed` (
  `DoodleName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  PRIMARY KEY (`DoodleName`,`Email`),
  KEY `Email` (`Email`),
  CONSTRAINT `completed_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `user` (`Email`),
  CONSTRAINT `completed_ibfk_2` FOREIGN KEY (`DoodleName`) REFERENCES `doodles` (`DoodleName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `doodles` (
  `DoodleName` varchar(255) NOT NULL,
  `isAlphabet` tinyint DEFAULT '0',
  `isDigit` tinyint DEFAULT '0',
  `isPlayDoodle` tinyint DEFAULT '0',
  `isDrawDoodle` tinyint DEFAULT '0',
  PRIMARY KEY (`DoodleName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;