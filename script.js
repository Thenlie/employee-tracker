const db = require('./db/connection');
const inquirer = require('inquirer');
const { employeeArrFill, deptArrFill, roleArrFill } = require('./utils/index');

const deptArr = deptArrFill();
const roleArr = roleArrFill();
const employeeArr = employeeArrFill();

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
            type: 'input',
            name: 'department',
            message: 'What department does the role belong to?'
        }])
        .then((ans) => {
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
            message: "What is the employee's last name?",
            choices: []
        }, {
            type: 'list',
            name: 'manager',
            message: "What is the employee's last name?",
            choices: []
        }])
        .then((ans) => {

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

        })    
};

const init = () => {
    initPrompt()
        .then(ans => {
            switch (ans.action) {
                case 'view all departments':
                    console.log(deptArr);
                    init();
                    return;
                case 'view all roles':
                    console.log(roleArr);
                    init();
                    return;
                case 'view all employees':
                    console.log(employeeArr);
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