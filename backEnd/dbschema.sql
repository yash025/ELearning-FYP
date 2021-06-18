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

CREATE TABLE `playDoodles` (
  `playDoodleName` varchar(255) NOT NULL,
  `level` varchar(50),
  PRIMARY KEY (`playDoodleName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `playCompleted` (
  `playDoodleName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`playDoodleName`,`email`),
  KEY `Email` (`Email`),
  CONSTRAINT `completed_ibfk_1` FOREIGN KEY (`email`) REFERENCES `user` (`Email`),
  CONSTRAINT `completed_ibfk_2` FOREIGN KEY (`playDoodleName`) REFERENCES `playDoodles` (`playDoodleName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `learnDoodles` (
  `learnDoodleName` varchar(255) NOT NULL,
  `isAlphabet` tinyint DEFAULT '0',
  `isDigit` tinyint DEFAULT '0',
  PRIMARY KEY (`learnDoodleName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `learnCompleted` (
  `learnDoodleName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`learnDoodleName`,`email`),
  KEY `Email` (`Email`),
  FOREIGN KEY (`email`) REFERENCES `user` (`Email`),
  FOREIGN KEY (`learnDoodleName`) REFERENCES `learnDoodles` (`learnDoodleName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;