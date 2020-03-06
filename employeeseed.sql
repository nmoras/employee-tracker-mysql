CREATE DATABASE tracker;

USE tracker;

CREATE TABLE Department (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR (30) NOT NULL
	);

  CREATE TABLE Role (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title  VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id integer, 
    foreign key(department_id) references department(id)
	);  

CREATE TABLE Employee (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    role_id integer NOT NULL,
    manager_id integer,
    foreign key(role_id) references role(id),
    foreign key(manager_id) references employee(manager_id)
	); 

INSERT INTO department (name)
VALUES ("John");

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe","200pk",'200k'), 
("Jane", "Doe","200pk",'200k'), 
("Joe", "Doe","200pk",'200k');

INSERT INTO Role(title, salary, department_id)
VALUES ("Manager", "7000","03ENG");


