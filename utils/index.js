const db = require('../db/connection');

const deptArr = [];
const roleArr = [];
const employeeArr = [];
const managerArr = [];

const departments = [];
const roles = [];
const employees = [];

// Populate array with departments
const deptArrFill = () => {
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            deptArr.push(rows[i].name)
        }
    });
    return deptArr;
};

// Populate array with roles
const roleArrFill = () => {
    db.query(`SELECT * FROM roles`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            roleArr.push(rows[i].title)
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
            employeeArr.push(rows[i].first_name + ' ' + rows[i].last_name)
        }
    });
    return employeeArr;
};

// Populate array with managers
const managerArrFill = () => {
    db.query(`SELECT * FROM employees WHERE manager_id = null`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            managerArr.push(rows[i].first_name + ' ' + rows[i].last_name)
        }
    });
    return managerArr;
};

// Get departments
const getDept = () => {
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
    db.query(`SELECT * FROM roles`, (err, rows) => {
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
    db.query(`SELECT * FROM employees ORDER BY last_name`, (err, rows) => {
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