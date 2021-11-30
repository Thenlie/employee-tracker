const db = require('../db/connection');

// Populate array with departments
const deptArrFill = () => {
    const deptArr = [];
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
    const roleArr = [];
    db.query(`SELECT * FROM roles`, (err, rows) => {
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
    const employeeArr = [];
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

module.exports = { deptArrFill, roleArrFill, employeeArrFill }