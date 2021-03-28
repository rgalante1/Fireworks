-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;

-- create table in db

CREATE TABLE `db`.`user` (
    `userID` INT NOT NULL AUTO_INCREMENT, 
    `username` VARCHAR(45), 
    `password` VARCHAR(45),
    `firstName` VARCHAR(45),
    `lastName` VARCHAR(45),
    `phone` VARCHAR(45),
    `userType` VARCHAR(45),
    `mail` VARCHAR(45),
    `employerID` VARCHAR(45),
    PRIMARY KEY (`userID`), 
    -- UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE `db`.`post` (
    `companyID` INT(10),
    `title` VARCHAR(45),
    `description` VARCHAR(45),
    FOREIGN KEY (`companyID`)
        REFERENCES company(`companyID`)
);

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

CREATE TABLE 'db'.'friends'(

    `userID` INT NOT NULL AUTO_INCREMENT,
    `friendID` int(10),
    `dateFriended` DATE,
    `otherDetails` VARCHAR(45),
    FOREIGN KEY (`userID`) 
        REFERENCES user(userID)

);


CREATE TABLE 'db'.'company'(
    'companyID' int(10),
    `comapnyName` varchar(45),
    `field` varchar(45),
    `description` varchar(45),
    PRIMARY KEY (`companyID`),
    FOREIGN KEY ('companyID')
        REFERENCES user(`employerID`)
    
);

CREATE TABLE 'db'.'accountType'(
    `userType` int(10),
    `name` varchar(45),
    `description` varchar(45),
    `permissions` int(10),
    FOREIGN KEY(`userType`)
        REFERENCES user(`userType`)
  
);

-- insert sample entry
-- INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');


