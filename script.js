const db = require('./db/connection');
const inquirer = require('inquirer');
const { deptArrFill, roleArrFill, employeeArrFill, managerArrFill, getDept, getRoles, getEmployees } = require('./utils/index');
const { newDept, newRole, newEmployee } = require('./utils/newData');
const Department = require('./lib/Department');
const Roles = require('./lib/Roles');
const Employee = require('./lib/Employee');

// Array of data
const deptArr = deptArrFill();
const roleArr = roleArrFill();
const employeeArr = employeeArrFill();
const managerArr = managerArrFill();

// Array of objects
let departments = getDept();
let roles = getRoles();
let employees = getEmployees();

const initPrompt = () => {
    return inquirer 
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        })
        .then((ans) => {
            return ans;
        })
};

const addDept = () => {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }])  
        .then((ans) => {
            const department = new Department(ans.name);
            newDept(department);
            console.log('Department Added!');
            return init();
        })  
};

const addRole = () => {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
            }, {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
            }, {
            type: 'list',
            name: 'department',
            message: 'What department does the role belong to?',
            choices: deptArr
        }])
        .then((ans) => {
            db.query(`SELECT id FROM department WHERE name = '${ans.department}'`, (err, row) => {
                if (err) throw err;
                var deptId = (row[0].id)
                const role = new Roles(ans.title, ans.salary, deptId);
                newRole(role);
            })
            console.log('Role Added!');
            return init();
        })    
};

const addEmployee = () => {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        }, {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        }, {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roleArr
        }, {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: managerArr
        }])
        .then((ans) => {
            console.log(ans.role)
            db.query(`SELECT id FROM roles WHERE title = '${ans.role}'`, (err, row) => {
                if (err) throw err;
                var rowId = row[0].id
            })
            // db.query(`SELECT id FROM employees WHERE first_name = '${}'`)
            // const employee = new Employee(ans.firstName, ans.lastName, ans.role, ans.manager);
            // newEmployee(employee);
            // console.log('Employee Added!');
            return init();
        })    
};

const updateRole = () => {
    return inquirer
        .prompt([{
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: employeeArr
        }])
        .then((ans) => {
            // TODO: Ask for more information, Update employee with new information
        })    
};

const connect = () => {
    db.connect(err => {
        if (err) throw err;
    })
}

const init = () => {
    initPrompt()
        .then(ans => {
            switch (ans.action) {
                case 'view all departments':
                    let testVar = getDept();
                    console.table(departments);
                    console.table(testVar);
                    return init();
                case 'view all roles':
                    console.table(roles);
                    return init();
                case 'view all employees':
                    console.table(employees);
                    return init();
                case 'add a department':
                    return addDept();
                case 'add a role':
                    return addRole();
                case 'add an employee':
                    return addEmployee();
                case 'update an employee role':
                    return updateRole();
            }
        })
};

connect();
init();