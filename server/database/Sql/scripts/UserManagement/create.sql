CREATE DATABASE `Quicksilver` /*!40100 DEFAULT CHARACTER SET latin1 */;

GO

CREATE TABLE `Role` (
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

GO

CREATE TABLE `User` (
  `_id` varchar(30) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_id_UNIQUE` (`_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_User_Role_idx` (`role`),
  CONSTRAINT `fk_User_Role` FOREIGN KEY (`role`) REFERENCES `Role` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

GO

CREATE TABLE `Client` (
  `_id` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `redirect_uri` varchar(200) DEFAULT NULL,
  `response_type` varchar(20) DEFAULT NULL,
  `client_id` varchar(200) DEFAULT NULL,
  `scope` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_id_UNIQUE` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

GO

CREATE TABLE `Token` (
  `_id` varchar(30) NOT NULL,
  `value` varchar(50) NOT NULL,
  `userId` varchar(30) NOT NULL,
  `clientId` varchar(30) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `Token__id_uindex` (`_id`),
  KEY `Token_Client__id_fk` (`clientId`),
  KEY `Token_User__id_fk` (`userId`),
  CONSTRAINT `Token_Client__id_fk` FOREIGN KEY (`clientId`) REFERENCES `Client` (`_id`),
  CONSTRAINT `Token_User__id_fk` FOREIGN KEY (`userId`) REFERENCES `User` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
