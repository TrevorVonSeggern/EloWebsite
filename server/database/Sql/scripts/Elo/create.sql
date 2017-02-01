START TRANSACTION;

CREATE TABLE `Game` (
  `_id` varchar(30) NOT NULL,
  `name` varchar(45) NOT NULL,
  `userId` varchar(30) DEFAULT NULL COMMENT 'Not null means that it is public.',
  PRIMARY KEY (`_id`),
  UNIQUE KEY `Game__id_uindex` (`_id`),
  UNIQUE KEY `uniqueGameNamePerUser` (`name`,`userId`),
  KEY `Game_User__id_fk` (`userId`),
  CONSTRAINT `Game_User__id_fk` FOREIGN KEY (`userId`) REFERENCES `User` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='A type of game that can be played.';

CREATE TABLE `Team` (
  `_id` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `gameId` varchar(30) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `Team__id_uindex` (`_id`),
  UNIQUE KEY `uniqueTeamPerGame` (`name`,`gameId`),
  KEY `Team_Game__id_fk` (`gameId`),
  CONSTRAINT `Team_Game__id_fk` FOREIGN KEY (`gameId`) REFERENCES `Game` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='A collection of players that compete against other teams.';

CREATE TABLE `Player` (
  `_id` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `gameId` varchar(30) NOT NULL,
  `userId` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `Player__id_uindex` (`_id`),
  UNIQUE KEY `uniquePlayerNamePerUser` (`name`,`userId`),
  KEY `Player_User__id_fk` (`userId`),
  CONSTRAINT `Player_User__id_fk` FOREIGN KEY (`userId`) REFERENCES `User` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='A team is a collection of players.';

CREATE TABLE `Event` (
  `_id` varchar(30) NOT NULL,
  `name` varchar(60) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime DEFAULT NULL COMMENT 'Null means that it has not ended.',
  `gameId` varchar(30) NOT NULL,
  `userId` varchar(30) DEFAULT NULL COMMENT 'Authorization purposes. Null means viewable by public.',
  `comment` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `Event__id_uindex` (`_id`),
  UNIQUE KEY `uniqueEventAsPerNameStartTimeUserId` (`name`,`userId`,`startTime`),
  KEY `Event_Game__id_fk` (`gameId`),
  KEY `Event_User__id_fk` (`userId`),
  CONSTRAINT `Event_Game__id_fk` FOREIGN KEY (`gameId`) REFERENCES `Game` (`_id`),
  CONSTRAINT `Event_User__id_fk` FOREIGN KEY (`userId`) REFERENCES `User` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Match` (
  `_id` varchar(30) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `teamA` varchar(30) NOT NULL,
  `teamB` varchar(30) NOT NULL,
  `eventId` varchar(30) NOT NULL,
  `status` smallint(5) unsigned DEFAULT NULL COMMENT 'Internal status for processing purposes.',
  PRIMARY KEY (`_id`),
  UNIQUE KEY `Match__id_uindex` (`_id`),
  UNIQUE KEY `uniqueMatchAsPerStartTimeEvent` (`eventId`,`startTime`),
  KEY `Match_TeamA__id_fk` (`teamA`),
  KEY `Match_TeamB__fk` (`teamB`),
  CONSTRAINT `Match_TeamA__id_fk` FOREIGN KEY (`teamA`) REFERENCES `Team` (`_id`),
  CONSTRAINT `Match_TeamB__fk` FOREIGN KEY (`teamB`) REFERENCES `Team` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='One team against another.';

CREATE TABLE `EloValue` (
  `_id` varchar(30) NOT NULL,
  `playerId` varchar(30) NOT NULL,
  `matchId` varchar(30) DEFAULT NULL,
  `eloValue` decimal(10,0) NOT NULL DEFAULT '400',
  PRIMARY KEY (`_id`),
  UNIQUE KEY `EloValue__id_uindex` (`_id`),
  UNIQUE KEY `uniquePlayersPerMatch` (`playerId`,`matchId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

COMMIT;