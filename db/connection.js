const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password:  '1qaz@WSX3edc$RFV',
        database: 'employee_tracker'
    },
    console.log('Connected to DB!')
);

module.exports = db;