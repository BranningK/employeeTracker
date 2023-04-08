-- Inserts multiple departments into the departments table --
INSERT INTO department (id, name)
VALUES
    ( 1, "Sales"),
    ( 2, "Engineering"),
    ( 3, "Finance"),
    ( 4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES 
    ( 1, "Sales Lead" , 100000, 1),
    ( 2, "Salesperson", 80000, 1),
    ( 3, "Lead Engineer", 150000, 2),
    ( 4, "Software Engineer", 120000, 2),
    ( 5, "Account Manager", 160000, 3),
    ( 6, "Accountant", 125000, 3),
    ( 7, "Legal Team Lead", 250000, 4),
    ( 8, "Lawyer", 190000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    ( 1, "John", "Mayer", 1, NULL),
    ( 2, "Taylor", "Swift", 2, 1),
    ( 3, "Dua", "Lipa", 2, 1),
    ( 4, "Ariana", "Grande", 2, 1),
    ( 5, "Judas", "Priest", 3, NULL),
    ( 6, "Black", "Sabbath", 4, 5),
    ( 7, "Iron", "Maiden", 4, 5),
    ( 8, "Rivers", "Cuomo", 5, NULL),
    ( 9, "Patrick", "Wilson", 6, 8),
    ( 10, "Scott", "Shriner", 6, 8),
    ( 11, "Brian", "Bell", 6, 8),
    ( 12, "Freddie", "Mercury", 7, NULL),
    ( 13, "Brian", "May", 8, 12),
    ( 14, "Roger", "Taylor", 8, 12),
    ( 15, "John", "Deacon", 8, 12);