const db = require('../db/connection');

const newDept = (obj) => {
    const sql = `INSERT INTO department (name) VALUES ('${obj.name}')`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        return;
    })
};

const newRole = (obj) => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [obj.title, obj.salary, obj.department_id];
    db.query(sql, params, (err, res) => {
        if (err) throw err;
        return;
    })
};

const newEmployee = (obj) => {
    const sql = `INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [obj.first_name, obj.last_name, obj.role_id, obj.manager_id];
    db.query(sql, params, (err, res) => {
        if (err) throw err;
        return;
    })
};

module.exports = { newDept, newRole, newEmployee }