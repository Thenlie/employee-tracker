const db = require('../db/connection');

const deptArr = [];
const roleArr = [];
const employeeArr = [];

// Populate array with departments
const deptArrFill = () => {
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            deptArr.push({name:rows[i].name, value:rows[i].id});
        }
    });
    return deptArr;
};

// Populate array with roles
const roleArrFill = () => {
    db.query(`SELECT DISTINCT * FROM roles LEFT JOIN department ON roles.department_id = department.id`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            roleArr.push({name:rows[i].title, value:rows[i].id}) ;
        }
    });
    return roleArr;
};

// Populate array with employees
const employeeArrFill = () => {
    db.query(`SELECT * FROM employees ORDER BY last_name`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            employeeArr.push({name:rows[i].first_name + ' ' + rows[i].last_name, value:rows[i].id});
        }
    });
    return employeeArr;
};

// Populate array with managers
const managerArrFill = () => {
    const managerArr = [];
    db.query(`SELECT * FROM employees WHERE manager_id IS NULL`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            managerArr.push({name:rows[i].first_name + ' ' + rows[i].last_name, value:rows[i].id})
        }
    });
    return managerArr;
};

// Get departments
const getDept = () => {
    const departments = [];
    db.query(`SELECT name FROM department`, (err, rows) => {
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
    db.query(`SELECT first_name, last_name, roles.title AS role FROM employees LEFT JOIN roles ON employees.role_id = roles.id`, (err, rows) => {
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

module.exports = { deptArrFill, roleArrFill, employeeArrFill, managerArrFill, getDept, getRoles, getEmployees }