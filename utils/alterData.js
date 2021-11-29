const db = require('../db/connection');

const updateRole = (obj) => {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`
    const params = [obj.newRole, obj.employee]
    db.query(sql, params, (err, res) => {
        if (err) throw err;
        return;
    })
}

const deleteEmployee = (obj) => {
    const sql = `DELETE FROM employees WHERE id = ${obj.employee}`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        return;
    })
}

module.exports = { updateRole, deleteEmployee }