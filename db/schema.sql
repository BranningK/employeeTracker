DROP DATABASE IF EXISTS workplace_db;
-- Creates the "workplace_db" database --
CREATE DATABASE workplace_db;
-- All of the following code will affect workplace_db --
USE workplace_db;

-- Creates the "department" table workplace_db -- 
CREATE TABLE department (
    -- id column that auto increments --
    id INT NOT NULL,
    -- name column that can't be null -- 
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL, 
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);