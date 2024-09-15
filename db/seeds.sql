INSERT INTO department (name) VALUES
('Sales'), ('Engineering'),('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Salesperson', 80000, 1), 
('Engineer', 125000, 2), 
('Accountant', 145000, 3),
('Lawyer', 35000, 4),
('Sales manager', 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 5, NULL), 
('Ann', 'Hargrove', 2, NULL), 
('Pete', 'Lionel', 3, NULL),
('Amy', 'Parker', 1, 1);