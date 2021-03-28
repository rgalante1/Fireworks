-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;

-- create table in db
CREATE TABLE `db`.`invites` (
    `userID` INT(10), 
	`dateSent` DATE, 
	`accepted` INT(1),
	`meetingID` INT(10),
	`senderID` INT(10),
	`inviteType` INT(1),
	
    FOREIGN KEY (`userID`)
		REFERENCES user(`userID`),
		
	FOREIGN KEY (`meetingID`), 
		REFERENCES metting(`meetingID`)
    
);

-- create table in db
CREATE TABLE `db`.`meeting` (
	`meetingID` INT(10) NOT NULL AUTO_INCREMENT,
	`description` VARCHAR(25), 
	`startTime` Date, 
	`endTime` Date,
	`meetingLink` VARCHAR(25), 
	`hostCompanyID` VARCHAR(25), 
	`location` VARCHAR(25), 
	`meetingType` VARCHAR(25),
	`rating` INT(10), 
	`attendees` INT(10), 
	`eventDate` Date, 
	
	PRIMARY KEY (`meetingID`)
		
	FOREIGN KEY (`hostCompanyID`), 
		REFERENCES company(`hostCompanyID`)
		
);

-- insert sample entry
INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');


