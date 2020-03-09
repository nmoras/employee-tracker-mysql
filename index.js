
const inquirer = require ('inquirer');
const mysql = require('mysql');

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
        }
        query( sql, args=[] ) {
            return new Promise( ( resolve, reject ) => {
                this.connection.query( sql, args, ( err, rows ) => {
                    if ( err )
                        return reject( err );
                    resolve( rows );
                } );
            } );
        }
        close() {
            return new Promise( ( resolve, reject ) => {
                this.connection.end( err => {
                    if ( err )
                        return reject( err );
                    resolve();
                } );
            } );
        }
    }

   //DB CONNECTION
   const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root1234",
    database: "tracker"
});

async function main() {
    
    let concatEmployeeName = await db.query(`SELECT CONCAT(first_name, ' ', last_name) AS 'Fullname' FROM employee;`)
    console.log(concatEmployeeName);
    let employeeNameArr = [];
            for(i = 0; i < concatEmployeeName.length; i++){
                employeeNameArr.push(concatEmployeeName[i].Fullname);
            }
            console.log(employeeNameArr);

    const employeeTrackerData = await inquirer.prompt([
        {
            type: 'list',
            name: 'select',
            message: 'what would you like to do',
            choices: [  'view all employee', 
                        'view all employee by role',
                        'view all employee by department',
                        'view all employees by manager',
                        'add employee',
                        'remove employee',
                        'update employee role',
                        'update employee manager'
                    ],    
        }, 
    
    ]);

    if(employeeTrackerData.select == "view all employee"){
        let employeeTable = await db.query( `SELECT * from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;` )
            console.table(employeeTable);
    }
    if(employeeTrackerData.select == 'view all employee by role'){
        let employeeRoleQuerydb;
        const emplyeeRoleQuery = await inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                choices: [  'Software Engineer', 
                            'Quality Engineer',
                            'Lead Developer',
                            'Lead Sales',
                            'Accountant'
                        ],    
            }, 
        ]);
        
        if(emplyeeRoleQuery.role == "Software Engineer"){
            employeeRoleQuerydb = await db.query(`SELECT * from Role LEFT JOIN employee ON employee.role_id = Role.id WHERE Role.title = 'Software Engineer';`)
            console.table(employeeRoleQuerydb);
        };
        
        if(emplyeeRoleQuery.role == "Quality Engineer"){ 
            employeeRoleQuerydb = await db.query(`SELECT * from Role LEFT JOIN employee ON employee.role_id = Role.id WHERE Role.title = 'Quality Engineer';`)
            console.table(employeeRoleQuerydb);
        };
        if(emplyeeRoleQuery.role == "Sales Lead"){ 
            employeeRoleQuerydb = await db.query(`SELECT * from Role LEFT JOIN employee ON employee.role_id = Role.id WHERE Role.title = 'Sales Lead';`)
            console.table(employeeRoleQuerydb);
        };
        if(emplyeeRoleQuery.role == "Accountant"){ 
            employeeRoleQuerydb = await db.query(`SELECT * from Role LEFT JOIN employee ON employee.role_id = Role.id WHERE Role.title = 'Accountant';`)
            console.table(employeeRoleQuerydb);
        };
    };

    if(employeeTrackerData.select == 'view all employee by department'){
        let employeeDepartmentQuerydb;
        const employeeDepartment = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    choices: [  'software development', 
                                'Quality Testing',
                                'sales',
                                'Accounts',
                                'human resource'
                            ],    
                }, 
            ]);
            if(employeeDepartment.department == "software development"){
                employeeDepartmentQuery = await db.query (`SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name from department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id WHERE department.name = 'software development';`)
                console.table(employeeDepartmentQuery);
            }
           
            if(employeeDepartment.department == "Quality Testing"){
                employeeDepartmentQuery = await db.query (`SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name from department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id WHERE department.name = 'Quality Testing';`)
                console.table(employeeDepartmentQuery);
            }
            
            if(employeeDepartment.department == "sales"){
                employeeDepartmentQuery = await db.query (`SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name from department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id WHERE department.name = 'sales';`)
                console.table(employeeDepartmentQuery);
            }
            
            if(employeeDepartment.department == "Accounts"){
                employeeDepartmentQuery = await db.query (`SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name from department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id WHERE department.name = 'Accounts';`)
                console.table(employeeDepartmentQuery);
            }
           
            if(employeeDepartment.department == "human resource"){
                employeeDepartmentQuery = await db.query (`SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name from department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id WHERE department.name = 'human resource';`)
                console.table(employeeDepartmentQuery);
            }   
        };
        // if(employeeTrackerData.select == 'view all employees by manager'){
        //     let employeeManager = await db.query( `SELECT * from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;` )
        //         console.table(employeeManager);
        // };
        if(employeeTrackerData.select == 'add employee'){
            let addEmployeeQuerydb;
            const addDepartment = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'Whats the department of employee?' ,
                    choices: [
                                    'software development', 
                                    'Quality Testing',
                                    'sales',
                                    'Accounts',
                                    'human resource'
                    ]  
                }
            ]);
            let addDepartmentQuery = await db.query ("INSERT INTO department (name) VALUES(?)", [addDepartment.department]);
            console.table(addDepartmentQuery);
            const addRole = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Whats the employee role title?'    
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Whats the salary of the employee?'    
                },
                {
                    type: 'list',
                    name: 'deptid',
                    message: 'Whats the department id?',
                    choices: [
                        1,
                        2,
                        3,
                        4,
                        5
                    ]
                },
            ]);
            let addRoleQuery = await db.query("INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)", [addRole.title, addRole.salary, addRole.deptid]);
            let addRoleQueryTable = await db.query(`SELECT * FROM Role`);
            console.table(addRoleQueryTable);
            const addEmployee = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstname',
                    message: 'Whats the first name of the employee?'    
                }, 
                {
                    type: 'input',
                    name: 'lastname',
                    message: 'Whats the last name of the employee?'    
                }, 
                {
                    type: 'input',
                    name: 'roleid',
                    message: 'Whats the employee role_id?'    
                }, 
                {
                    type: 'input',
                    name: 'managerid',
                    message: 'Whats the employee manager_id?'    
                },
            ]);
        addEmployeeQuerydb = await db.query ("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)", [addEmployee.firstname, addEmployee.lastname, addEmployee.roleid, addEmployee.managerid]);
        let addEmployeeQuerydbTable = await db.query(`SELECT * FROM employee`);
        console.table(addEmployeeQuerydbTable);
        };

        if(employeeTrackerData.select == 'remove employee'){
            const employeedel = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'fullname',
                    choices: employeeNameArr
                }, 
            ]);
           
            let employeedelsplit = employeedel.fullname.split(" ");
            let firstNameDelete = employeedelsplit[0];
            let lastNameDelete = employeedelsplit[1];
            let employeedelQuery =  await db.query( "DELETE FROM employee WHERE first_name = ? AND last_name = ?", [firstNameDelete, lastNameDelete]);
            let employeeDelQueryTable = await db.query( `SELECT * FROM employee`);
            console.table(employeeDelQueryTable);
           
        };  

        if(employeeTrackerData.select == 'update employee role'){
            const updateEmployee = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'updatefullname',
                    choices: employeeRoleArr
                }, 
                {
                    type: 'input',
                    name: 'newRole',
                    choices: "type a role to be updated to?"
                }        
            ]);
        
            let splitUpdateEmployee = updateEmployee.updatefullname.split(" ");
            let empFirstName = splitUpdateEmployee[0];
            let empSecondName = splitUpdateEmployee[1];
            
            let updateRole = await db.query(`UPDATE role left join employee ON employee.role_id = Role.id SET role.title = "updateEmployee.newRole" where first_name = "?",` [empFirstName])
            let updateRoleTable = await db.query(`SELECT * FROM role`)
            console.table(updateRoleTable);
            
        };
        if(employeeTrackerData.select == 'update employee manager'){
            manageridArr = [];
            let managerList = await db.query(`SELECT manager_id AS 'Managerlist' FROM employee; `)
            for ( i = 0; i < managerList.length; i++  );
            manageridArrr.push(managerList[i].Managerlist)
            const updateManager = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeefullname',
                message: 'choose employee',
                choices: employeeRoleArr
            },
            {
                type: 'input',
                name: 'newManager',
                message: 'choose new manager_id',
                choices: manageridArr
            }        
        ]);
            let newManagerid = updateManager.newManager;
            let splitNewManager = updateManager.employeefullname.split(" ");
            let firstNameEmp = splitNewManager[0];
            let updateManagerQuery = await db.query( `UPDATE employee SET manager_id = newManagerid where first_name = "?";` [firstNameEmp] )
            let updateManagerQueryTable = await db.query(`SELECT * FROM employee`)
            console.table(updateManagerQueryTable);
        };
}
main();
// module.exports = { db } ;