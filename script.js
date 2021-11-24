const db = require('./db/connection');
const inquirer = require('inquirer');

const initPrompt = () => {
    return inquirer 
        .prompt([{
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }])
    .then((ans) => {
        return ans;
    })
};

initPrompt()
    .then(ans => {
        switch (ans.action) {
            case 'view all departments':
                console.log(1);
                return;
            case 'view all roles' :
                console.log(2);
                return;
            case 'view all employees' :
                console.log(3);
                return;
            case 'add a department' :
                console.log(4);
                return;
            case 'add a role' :
                console.log(5);
                return;
            case 'add an employee' :
                console.log(6);
                return;
            case 'update an employee role' :
                console.log(7);
                return;
        }
        console.log(ans.action);
    })