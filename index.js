
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
    console.log("i am running");
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
        let employeeRole = await db.query( `SELECT * from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;` )
            console.table(employeeRole);
    };
    if(employeeTrackerData.select == 'view all employee by department'){
        let employeeDepartment = await db.query( `SELECT * from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;` )
            console.table(employeeDepartment);
    };
    if(employeeTrackerData.select == 'view all employees by manager'){
        let employeeManager = await db.query( `SELECT * from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;` )
            console.table(employeeManager);
    };
    if(employeeTrackerData.select == 'add employee'){
        let addEmployee = await db.query( `SELECT * from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;` )
            console.table(addEmployee);
    };
    if(employeeTrackerData.select == 'remove employee'){
        let removeEmployee = await db.query( `SELECT * from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;` )
            console.table(removeEmployee);
    };
    if(employeeTrackerData.select == 'update employee role'){
        let updateRole = await db.query( `SELECT * from employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id;` )
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
module.exports = { db } ;