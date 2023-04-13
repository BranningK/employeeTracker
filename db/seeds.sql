-- Inserts multiple departments into the departments table --
INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Sales Lead" , 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Account Manager", 160000, 3),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Mayer", 1, NULL),
    ("Taylor", "Swift", 2, 1),
    ("Dua", "Lipa", 2, 1),
    ("Ariana", "Grande", 2, 1),
    ("Judas", "Priest", 3, NULL),
    ("Black", "Sabbath", 4, 5),
    ("Iron", "Maiden", 4, 5),
    ("Rivers", "Cuomo", 5, NULL),
    ("Patrick", "Wilson", 6, 8),
    ("Scott", "Shriner", 6, 8),
    ("Brian", "Bell", 6, 8),
    ("Freddie", "Mercury", 7, NULL),
    ("Brian", "May", 8, 12),
    ("Roger", "Taylor", 8, 12),
    ("John", "Deacon", 8, 12);