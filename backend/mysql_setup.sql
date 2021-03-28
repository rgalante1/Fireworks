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

-- insert sample entry
-- INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');


