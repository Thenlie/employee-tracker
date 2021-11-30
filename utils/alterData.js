const db = require('../db/connection');

const updateRole = (obj) => {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`
    const params = [obj.newRole, obj.employee]
    db.query(sql, params, (err, res) => {
        if (err) throw err;
        return;
    })
}

const updateManager = (obj) => {
    const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`
    const params = [obj.newManager, obj.employee]
    db.query(sql, params, (err, res) => {
        if (err) throw err;
        return;
    })
}

const deleteDept = (obj) => {
    const sql = `DELETE FROM department WHERE id = ${obj.department}`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        return;
    })
};
const deleteRole = (obj) => {
    const sql = `DELETE FROM roles WHERE id = ${obj.role}`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        return;
    })
};

const deleteEmployee = (obj) => {
    const sql = `DELETE FROM employees WHERE id = ${obj.employee}`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        return;
    })
};

module.exports = { updateRole, updateManager, deleteDept, deleteRole, deleteEmployee }