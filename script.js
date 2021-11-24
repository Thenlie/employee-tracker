const db = require('./db/connection');
const inquirer = require('inquirer');

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
            name: 'deptName',
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
            name: 'roleName',
            message: 'What is the name of the role?'
            }, {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?'
            }, {
            type: 'input',
            name: 'roleDept',
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
            name: 'addEmployee',
            message: ''
        }])    
};

const updateEmployee = () => {
    return inquirer
        .prompt([{
            type: 'input',
            name: 'updateEmployee',
            message: ''
        }])    
};


initPrompt()
    .then(ans => {
        switch (ans.action) {
            case 'view all departments':
                console.log(1);
                return;
            case 'view all roles':
                console.log(2);
                return;
            case 'view all employees':
                console.log(3);
                return;
            case 'add a department':
                console.log(4);
                addDept();
                return;
            case 'add a role':
                console.log(5);
                addRole();
                return;
            case 'add an employee':
                console.log(6);
                addEmployee();
                return;
            case 'update an employee role':
                console.log(7);
                updateEmployee();
                return;
        }
        console.log(ans.action);
    })