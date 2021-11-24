const db = require('../db/connection');

const deptArr = [];
const roleArr = [];
const employeeArr = [];

// Populate array with employees
const employeeArrFill = () => {
    db.query(`SELECT * FROM employees`, (err, rows) => {
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

module.exports = { employeeArrFill, deptArrFill, roleArrFill }