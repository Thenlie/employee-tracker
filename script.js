const db = require('./db/connection');
const inquirer = require('inquirer');
const { deptArrFill, roleArrFill, employeeArrFill } = require('./utils/populateArray');
const { getDept, getRoles, getEmployees } = require('./utils/getTables');
const { newDept, newRole, newEmployee } = require('./utils/newData');
const { updateRole, updateManager, deleteDept, deleteRole, deleteEmployee } = require('./utils/alterData');
const Department = require('./lib/Department');
const Roles = require('./lib/Roles');
const Employee = require('./lib/Employee');

// Array of data
let deptArr = deptArrFill();
let roleArr = roleArrFill();
let employeeArr = employeeArrFill();

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
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'update an employee\'s manager', 'delete a department', 'delete a role', 'delete an employee', 'quit']
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
            message: 'What is the name of the department?',
            validate: function(name) {
                if (!name) {
                    console.log('You must enter a name!')
                    return false;
                }
                return true;
            }
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
            message: 'What is the name of the role?',
            validate: function(title) {
                if (!title) {
                    console.log('You must enter a name!')
                    return false;
                } 
                return true;
            }
            }, {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
            validate: function(salary) {
                if (!isNaN(salary)) {
                    return true;
                } else {
                    console.log('You must enter a salary number!');
                    return false;
                }
            }
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
            message: "What is the employee's first name?",
            validate: function(firstName) {
                if (!firstName) {
                    console.log('You must enter a name!')
                    return false;
                } 
                return true;
            }
        }, {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: function(lastName) {
                if (!lastName) {
                    console.log('You must enter a name!')
                    return false;
                } 
                return true;
            }
        }, {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roleArr
        }, {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: [{name:'No Manager', value:null}].concat(employeeArr)
        }])
        .then((ans) => {
            const employee = new Employee(ans.firstName, ans.lastName, ans.role, ans.manager);
            newEmployee(employee);
            console.log('Employee Added!');
            employees = getEmployees();
            employeeArr = employeeArrFill();
            return init();
        })    
};

const updateEmployeeRole = () => {
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

const updateEmployeeManager = () => {
    return inquirer
        .prompt([{
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: employeeArr
        },{
            type: 'list',
            name: 'newManager',
            message: 'Who is the employees new manager?',
            choices: employeeArr
        }])
        .then((ans) => {
            updateManager(ans);
            console.log('Manager Updated!');
            employees = getEmployees();
            employeeArr = employeeArrFill();
            return init();
        })    
};


const removeDept = () => {
    return inquirer
        .prompt([{
            type: 'list',
            name: 'department',
            message: 'Which department would you like to delete?',
            choices: deptArr
        }])
        .then((ans) => {
            deleteDept(ans);
            console.log('Department Deleted!');
            departments = getDept();
            deptArr = deptArrFill();
            roles = getRoles();
            roleArr = roleArrFill();
            employees = getEmployees();
            employeeArr = employeeArrFill();
            return init();
        })
};

const removeRole = () => {
    return inquirer
        .prompt([{
            type: 'list',
            name: 'role',
            message: 'Which role would you like to delete?',
            choices: roleArr
        }])
        .then((ans) => {
            deleteRole(ans);
            console.log('Role Deleted!');
            roles = getRoles();
            roleArr = roleArrFill();
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
            message: 'Which employee would you like to delete?',
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
                    console.table(departments);
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
                    return updateEmployeeRole();
                case 'update an employee\'s manager':
                    return updateEmployeeManager();
                case 'delete a department':
                    return removeDept();
                case 'delete a role':
                    return removeRole();
                case 'delete an employee':
                    return removeEmployee();
                case 'quit':
                    process.exit();
            }
        })
};

connect();
init();