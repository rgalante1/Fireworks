-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;

-- create table in db
CREATE TABLE `db`.`test_table` (
    `id` INT NOT NULL AUTO_INCREMENT, 
    `value` VARCHAR(45), 
    PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
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
INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');


