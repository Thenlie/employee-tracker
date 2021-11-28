const db = require('./db/connection');
const inquirer = require('inquirer');
const { deptArrFill, roleArrFill, employeeArrFill, managerArrFill } = require('./utils/populateArray');
const { getDept, getRoles, getEmployees } = require('./utils/getTables');
const { newDept, newRole, newEmployee } = require('./utils/newData');
const { updateRole, deleteEmployee } = require('./utils/alterData');
const Department = require('./lib/Department');
const Roles = require('./lib/Roles');
const Employee = require('./lib/Employee');

// Array of data
let deptArr = deptArrFill();
let roleArr = roleArrFill();
let employeeArr = employeeArrFill();
let managerArr = managerArrFill();

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
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'delete a department', 'delete a role', 'delete an employee', 'quit']
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
            departments = getDept();
            deptArr = deptArrFill();
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
            const role = new Roles(ans.title, ans.salary, ans.department);
            newRole(role);
            console.log('Role Added!');
            roles = getRoles();
            roleArr = roleArrFill();
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
            let managerId = '';
            (ans.manager === 'none') ? managerId = null : managerId = ans.manager;
            const employee = new Employee(ans.firstName, ans.lastName, ans.role, managerId);
            newEmployee(employee);
            console.log('Employee Added!');
            employees = getEmployees();
            employeeArr = employeeArrFill();
            return init();
        })    
};

const updateEmployee = () => {
    return inquirer
        .prompt([{
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: employeeArr
        },{
            type: 'list',
            name: 'newRole',
            message: 'What is the employees new role?',
            choices: roleArr
        }])
        .then((ans) => {
            updateRole(ans);
            console.log('Role Updated!');
            employees = getEmployees();
            employeeArr = employeeArrFill();
            return init();
        })    
};

const removeEmployee = () => {
    return inquirer
        .prompt([{
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: employeeArr
        }])
        .then((ans) => {
            deleteEmployee(ans);
            console.log('Employee Deleted!');
            employees = getEmployees();
            employeeArr = employeeArrFill();
            return init();
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
                    // let x = getDept();
                    console.table(departments);
                    // console.table(x);
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
                    return updateEmployee();
                case 'delete a department':
                    return init();
                case 'delete a role':
                    return init();
                case 'delete an employee':
                    return removeEmployee();
                case 'quit':
                    process.exit();
            }
        })
};

connect();
init();