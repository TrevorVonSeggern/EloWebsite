-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: Quicksilver
-- Source Schemata: Quicksilver
-- Created: Wed Jan 11 22:13:15 2017
-- Workbench Version: 6.3.8
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema Quicksilver
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `Quicksilver` ;
CREATE SCHEMA IF NOT EXISTS `Quicksilver` ;

-- ----------------------------------------------------------------------------
-- Table Quicksilver.Client
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Quicksilver`.`Client` (
  `_id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `url` VARCHAR(200) NULL DEFAULT NULL,
  `redirect_uri` VARCHAR(200) NULL DEFAULT NULL,
  `response_type` VARCHAR(20) NULL DEFAULT NULL,
  `client_id` VARCHAR(200) NULL DEFAULT NULL,
  `scope` VARCHAR(45) NULL DEFAULT NULL,
  `state` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE INDEX `_id_UNIQUE` (`_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table Quicksilver.EloValue
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Quicksilver`.`EloValue` (
  `_id` VARCHAR(30) NOT NULL,
  `playerId` VARCHAR(30) NOT NULL,
  `matchId` VARCHAR(30) NULL DEFAULT NULL,
  `eloValue` DECIMAL(10,0) NOT NULL DEFAULT '400',
  PRIMARY KEY (`_id`),
  UNIQUE INDEX `EloValue__id_uindex` (`_id` ASC),
  UNIQUE INDEX `uniquePlayersPerMatch` (`playerId` ASC, `matchId` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table Quicksilver.Event
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Quicksilver`.`Event` (
  `_id` VARCHAR(30) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `startTime` DATETIME NOT NULL,
  `endTime` DATETIME NULL DEFAULT NULL COMMENT 'Null means that it has not ended.',
  `gameId` VARCHAR(30) NOT NULL,
  `userId` VARCHAR(30) NULL DEFAULT NULL COMMENT 'Authorization purposes. Null means viewable by public.',
  `comment` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE INDEX `Event__id_uindex` (`_id` ASC),
  UNIQUE INDEX `uniqueEventAsPerNameStartTimeUserId` (`name` ASC, `userId` ASC, `startTime` ASC),
  INDEX `Event_Game__id_fk` (`gameId` ASC),
  INDEX `Event_User__id_fk` (`userId` ASC),
  CONSTRAINT `Event_Game__id_fk`
    FOREIGN KEY (`gameId`)
    REFERENCES `Quicksilver`.`Game` (`_id`),
  CONSTRAINT `Event_User__id_fk`
    FOREIGN KEY (`userId`)
    REFERENCES `Quicksilver`.`User` (`_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table Quicksilver.Game
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Quicksilver`.`Game` (
  `_id` VARCHAR(30) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `userId` VARCHAR(30) NULL DEFAULT NULL COMMENT 'Not null means that it is public.',
  `startValue` DECIMAL(10,0) NOT NULL DEFAULT '1200',
  `scale` DECIMAL(10,0) NULL DEFAULT '400',
  PRIMARY KEY (`_id`),
  UNIQUE INDEX `Game__id_uindex` (`_id` ASC),
  UNIQUE INDEX `uniqueGameNamePerUser` (`name` ASC, `userId` ASC),
  INDEX `Game_User__id_fk` (`userId` ASC),
  CONSTRAINT `Game_User__id_fk`
    FOREIGN KEY (`userId`)
    REFERENCES `Quicksilver`.`User` (`_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COMMENT = 'A type of game that can be played.';

-- ----------------------------------------------------------------------------
-- Table Quicksilver.Match
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Quicksilver`.`Match` (
  `_id` VARCHAR(30) NOT NULL,
  `startTime` DATETIME NOT NULL,
  `endTime` DATETIME NOT NULL,
  `teamA` VARCHAR(30) NOT NULL,
  `teamB` VARCHAR(30) NOT NULL,
  `eventId` VARCHAR(30) NOT NULL,
  `status` SMALLINT(5) UNSIGNED NULL DEFAULT NULL COMMENT 'Internal status for processing purposes.',
  `winner` VARCHAR(45) NULL DEFAULT NULL COMMENT 'In reference to teamA. 1 teamA wins, 0 teamB wins. null is a tie or ongoing match.',
  PRIMARY KEY (`_id`),
  UNIQUE INDEX `Match__id_uindex` (`_id` ASC),
  UNIQUE INDEX `uniqueMatchAsPerStartTimeEvent` (`eventId` ASC, `startTime` ASC),
  INDEX `Match_TeamA__id_fk` (`teamA` ASC),
  INDEX `Match_TeamB__fk` (`teamB` ASC),
  CONSTRAINT `Match_TeamA__id_fk`
    FOREIGN KEY (`teamA`)
    REFERENCES `Quicksilver`.`Team` (`_id`),
  CONSTRAINT `Match_TeamB__fk`
    FOREIGN KEY (`teamB`)
    REFERENCES `Quicksilver`.`Team` (`_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COMMENT = 'One team against another.';

-- ----------------------------------------------------------------------------
-- Table Quicksilver.Player
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Quicksilver`.`Player` (
  `_id` VARCHAR(30) NOT NULL,
  `name` VARCHAR(40) NOT NULL,
  `gameId` VARCHAR(30) NOT NULL,
  `userId` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE INDEX `Player__id_uindex` (`_id` ASC),
  UNIQUE INDEX `uniquePlayerNamePerUser` (`name` ASC, `userId` ASC),
  INDEX `Player_User__id_fk` (`userId` ASC),
  CONSTRAINT `Player_User__id_fk`
    FOREIGN KEY (`userId`)
    REFERENCES `Quicksilver`.`User` (`_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COMMENT = 'A team is a collection of players.';

-- ----------------------------------------------------------------------------
-- Table Quicksilver.Role
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Quicksilver`.`Role` (
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table Quicksilver.Team
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Quicksilver`.`Team` (
  `_id` VARCHAR(30) NOT NULL,
  `gameId` VARCHAR(30) NOT NULL,
  `name` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE INDEX `Team__id_uindex` (`_id` ASC),
  UNIQUE INDEX `uniqueTeamPerGame` (`name` ASC, `gameId` ASC),
  INDEX `Team_Game__id_fk` (`gameId` ASC),
  CONSTRAINT `Team_Game__id_fk`
    FOREIGN KEY (`gameId`)
    REFERENCES `Quicksilver`.`Game` (`_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COMMENT = 'A collection of players that compete against other teams.';

-- ----------------------------------------------------------------------------
-- Table Quicksilver.Token
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Quicksilver`.`Token` (
  `_id` VARCHAR(30) NOT NULL,
  `value` VARCHAR(50) NOT NULL,
  `userId` VARCHAR(30) NOT NULL,
  `clientId` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE INDEX `Token__id_uindex` (`_id` ASC),
  INDEX `Token_Client__id_fk` (`clientId` ASC),
  INDEX `Token_User__id_fk` (`userId` ASC),
  CONSTRAINT `Token_Client__id_fk`
    FOREIGN KEY (`clientId`)
    REFERENCES `Quicksilver`.`Client` (`_id`),
  CONSTRAINT `Token_User__id_fk`
    FOREIGN KEY (`userId`)
    REFERENCES `Quicksilver`.`User` (`_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table Quicksilver.User
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Quicksilver`.`User` (
  `_id` VARCHAR(30) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `role` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE INDEX `_id_UNIQUE` (`_id` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  INDEX `fk_User_Role_idx` (`role` ASC),
  CONSTRAINT `fk_User_Role`
    FOREIGN KEY (`role`)
    REFERENCES `Quicksilver`.`Role` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;
SET FOREIGN_KEY_CHECKS = 1;
