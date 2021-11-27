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
    db.query(`SELECT title, salary, department.name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id`, (err, rows) => {
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
    // db.query(`SELECT * FROM employees ORDER BY last_name`, (err, rows) => {
    // db.query(`SELECT first_name, last_name, roles.title AS role FROM employees LEFT JOIN roles ON employees.role_id = roles.id`, (err, rows) => {
    db.query(`SELECT e.first_name, e.last_name, e.role_id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;`, (err, rows) => {
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