const db = require('../db/connection');

// Get departments
const getDept = () => {
    const departments = [];
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            departments.push(rows[i]);
        }
    });
    return departments;
};

// Get roles
const getRoles = () => {
    const roles = [];
    db.query(`SELECT roles.id, title, salary, department.name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            roles.push(rows[i]);
        }
    });
    return roles;
};

// Get employees
const getEmployees = () => {
    const employees = [];
    db.query(`SELECT e.id, e.first_name, e.last_name, roles.title AS job_title, roles.salary AS salary, department.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e LEFT JOIN roles ON role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees m ON e.manager_id = m.id`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            employees.push(rows[i]);
        }
    });
    return employees;
};

module.exports = { getDept, getRoles, getEmployees }