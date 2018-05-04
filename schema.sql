# Schema

DROP DATABASE if exists computer_db;
CREATE DATABASE computer_db;
USE computer_db;

CREATE table comparison
(
	id int NOT NULL AUTO_INCREMENT,
	model varchar(40) NOT NULL,
	operating_system varchar(10) NOT NULL,
    price decimal(4, 2) NOT NULL,
    display_size varchar (15) NOT NULL,
    display_resolution varchar (15) NOT NULL,
    processor varchar (10) NOT NULL,
    hard_drive_size varchar (15) NOT NULL,
    memory_available varchar (10) NOT NULL,
    ports varchar (10) NOT NULL,
    website varchar (100) NOT NULL,
    description varchar (255) NOT NULL,
    
	PRIMARY KEY (id)
)


