const db = require('./db/connection');
const inquirer = require('inquirer');
const { deptArrFill, roleArrFill, employeeArrFill, managerArrFill, getDept, getRoles, getEmployees } = require('./utils/index');

// Array of data
const deptArr = deptArrFill();
const roleArr = roleArrFill();
const employeeArr = employeeArrFill();
const managerArr = managerArrFill();
// Array of objects
const departments = getDept();
const roles = getRoles();
const employees = getEmployees();

const initPrompt = () => {
    return inquirer 
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        })
        .then((ans) => {
            console.log('hit')
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
            // TODO: Create a new department in SQL and re-populate the tables (make obj?)
            return (ans);
        })  
};

const addRole = () => {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'role',
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
            // TODO: Create a new role in SQL and re-populate the tables (make obj?)
            return ans;
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
            // TODO: Create a new employee in SQL and re-populate the tables (make obj?)
            return ans;
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

const init = () => {
    initPrompt()
        .then(ans => {
            switch (ans.action) {
                case 'view all departments':
                    console.table(departments);
                    init();
                    return;
                case 'view all roles':
                    console.table(roles);
                    init();
                    return;
                case 'view all employees':
                    console.table(employees);
                    init();
                    return;
                case 'add a department':
                    addDept();
                    return;
                case 'add a role':
                    addRole();
                    return;
                case 'add an employee':
                    addEmployee();
                    return;
                case 'update an employee role':
                    updateRole();
                    return;
            }
            console.log(ans.action);
        })
};

init();