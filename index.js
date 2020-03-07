
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
    let employeeRoleArr = [];
            for(i = 0; i < concatEmployeeName.length; i++){
                employeeRoleArr.push(concatEmployeeName[i].Fullname);
            }
            console.log(employeeRoleArr);

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
                name: 'select',
                choices: [  'Software Engineer', 
                            'Quality Engineer',
                            'Lead Developer',
                            'Lead Sales',
                            'Accountant'
                        ],    
            }, 
        ]);
        
        if(emplyeeRoleQuery == "Software Engineer"){
            employeeRoleQuerydb = await db.query(`SELECT * from Role LEFT JOIN employee ON employee.role_id = Role.id WHERE Role.title = 'Software Engineer';`)
            console.log(employeeRoleQuerydb);
        };
        
        if(emplyeeRoleQuery == "Quality Engineer"){ 
            employeeRoleQuerydb = await db.query(`SELECT * from Role LEFT JOIN employee ON employee.role_id = Role.id WHERE Role.title = 'Quality Engineer';`)
            console.log(employeeRoleQuerydb);
        };
        if(emplyeeRoleQuery == "Sales Lead"){ 
            employeeRoleQuerydb = await db.query(`SELECT * from Role LEFT JOIN employee ON employee.role_id = Role.id WHERE Role.title = 'Sales Lead';`)
            console.log(employeeRoleQuerydb);
        };
        if(emplyeeRoleQuery == "Accountant"){ 
            employeeRoleQuerydb = await db.query(`SELECT * from Role LEFT JOIN employee ON employee.role_id = Role.id WHERE Role.title = 'Accountant';`)
            console.log(employeeRoleQuerydb);
        };
    };

    if(employeeTrackerData.select == 'view all employee by department'){
        let employeeDepartmentQuerydb;
        const employeeDepartmentQuery = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'select',
                    choices: [  'software development', 
                                'Quality Testing',
                                'sales',
                                'Accounts',
                                'human resource'
                            ],    
                }, 
            ]);
            if(employeeDepartmentQuery == "software development"){
                employeeDepartmentQuery = await db.querry (`SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name from department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id WHERE department.name = 'software development';`)
                console.log(employeeDepartmentQuery);
            }
           
            if(employeeDepartmentQuery == "Quality Testing"){
                employeeDepartmentQuery = await db.querry (`SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name from department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id WHERE department.name = 'Quality Testing';`)
                console.log(employeeDepartmentQuery);
            }
            
            if(employeeDepartmentQuery == "sales"){
                employeeDepartmentQuery = await db.querry (`SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name from department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id WHERE department.name = 'sales';`)
                console.log(employeeDepartmentQuery);
            }
            
            if(employeeDepartmentQuery == "Accounts"){
                employeeDepartmentQuery = await db.qerry (`SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name from department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id WHERE department.name = 'Accounts';`)
                console.log(employeeDepartmentQuery);
            }
           
            if(employeeDepartmentQuery == "human resource"){
                employeeDepartmentQuery = await db.qerry (`SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name from department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id WHERE department.name = 'human resource';`)
                console.log(employeeDepartmentQuery);
            }   
        };
        // if(employeeTrackerData.select == 'view all employees by manager'){
        //     let employeeManager = await db.query( `SELECT * from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;` )
        //         console.table(employeeManager);
        // };
        if(employeeTrackerData.select == 'add employee'){
            let addEmployeeQuerydb;
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
        addEmployeeQuerydb = await db.qerry ("INSERT INTO employee(`first_name`, `last_name`, `role_id`, `manager_id`)`) VALUES('?','?','?','?')", [addEmployee.firstname, addEmployee.lastname, addEmployee.roleid, addEmployee.managerid];)
            console.log(addEmployeeQuerydb);
            
        };

        if(employeeTrackerData.select == 'remove employee'){
            const employeedel = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'fullname',
                    choices: employeeNameArr
                }, 
            ]);
            console.log(employeedel.fullname);
            let employeedelsplit = employeedel.fullname.split(" ");
            let firstNameDelete = (employeedelsplit[0]);
            let lastNameDelete = (employeedelsplit[1]);
            let employeedelQuery =  await db.query( "DELETE FROM employee WHERE first_name = ? & last_name = ?", [firstNameDelete, lastNameDelete]);
            console.log(employeedelQuery);
           
        };

        if(employeeTrackerData.select == 'update employee role'){
            const updateEmployee = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'updatefullname',
                    choices: employeeRoleArr
                }, 
            ]);
            console.log(updateEmployee.updatefullname);
            let splitUpdateEmployee = updateEmployee.updatefullname.split(" ");
            let empFirstName = splitUpdateEmployee[0];
            let empSecondName = splitUpdateEmployee[1];
            
            let updateEmployeeRole = await db.query( `SELECT * from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;` )
                console.table(updateRole);
        };
        if(employeeTrackerData.select == 'update employee manager'){
            let updateManager = await db.query( `SELECT * from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;` )
                console.table(updateManager);
        };


    



    // const departmentData = await inquirer.prompt([
    //     {
    //         name: 'department',
    //         type: 'input',
    //         message: `What is the name of the department?`
    //     }
    // ]);
    
    // await db.query( "INSERT INTO Department (`name`) VALUES(?)", [departmentData.name] );   

    // const employeeData = await inquirer.prompt([
    //     {
    //         name: 'title',
    //         type: 'input',
    //         message: `What is the Role Title?`
    //     },
    
    // ])
    // await db.query( "INSERT INTO Department (`name`) VALUES(?)", [departmentData.name] );   

    



}
main();
// module.exports = { db } ;