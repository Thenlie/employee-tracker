INSERT INTO department (name)
VALUES
    ('sales'),
    ('design'),
    ('manufacturing');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('sales_manager', 80000, 1),
    ('design_manager', 70000, 2),
    ('manufacturing_manager', 60000, 3),
    ('sales_associate', 30000, 1),
    ('designer', 40000, 2),
    ('machine_operator', 25000, 3),
    ('customer_service', 30000, 1),
    ('engineer', 50000, 2),
    ('maintenance', 30000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Kevin', 'Taylor', 1, null),
    ('Owen', 'Dyer', 2, null),
    ('Faith', 'North', 3, null),
    ('Kylie', 'Ross', 4, 1),
    ('Keith', 'Lyman', 5, 2),
    ('Paul', 'White', 6, 3),
    ('Yvonne', 'Henderson', 7, 1),
    ('Andrew', 'Reid', 8, 2),
    ('Phil', 'Jones', 9, 3);