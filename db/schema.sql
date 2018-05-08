DROP DATABASE IF EXISTS Computers;

CREATE DATABASE Computers;

USE Computers;

CREATE TABLE all_Computers (
	id INT AUTO_INCREMENT NOT NULL,
	computer_name VARCHAR(100) NOT NULL,
    computer_photo VARCHAR(100) NOT NULL,
    computer_q1 INTEGER(1), 
    computer_q2 INTEGER(1), 
    computer_q3 INTEGER(1), 
    computer_q4 INTEGER(1), 
    computer_specs VARCHAR (255),
    computer_website VARCHAR (255),
	PRIMARY KEY (id)

);