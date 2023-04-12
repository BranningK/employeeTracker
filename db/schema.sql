DROP DATABASE IF EXISTS workplace_db;
-- Creates the "workplace_db" database --
CREATE DATABASE workplace_db;
-- All of the following code will affect workplace_db --
USE workplace_db;

-- Creates the "department" table workplace_db -- 
CREATE TABLE department (
    -- id column that auto increments --
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- name column that can't be null -- 
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);