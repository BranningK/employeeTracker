const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'S1imeRancher15%%',
    database: 'workplace_db'
  },
  console.log(`Connected to the workplace_db database.`)
);

const startApp = () => {
  return inquirer
    .prompt(
      {
        type: "list",
        name: "nav",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      }
    )
    .then((data) =>{
      switch (data.nav) {
        case "View all departments":
          departments();
          break;
        case "View all roles":
          roles();
          break;
        case "View all employees":
          employees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateRole();
          break;
      }
    });
};

function departments() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
};

function roles() {
  db.query("SELECT * FROM role", function (err, res){
    if (err) throw err;
    res.forEach(element => {
      switch (element.department_id) {
        case 1:
          return element.department_id = "Sales";
        case 2:
          return element.department_id = "Engineering";
        case 3:
          return element.department_id = "Finance";
        case 4:
          return element.department_id = "Legal";
      };
    });
    console.table(res);
    startApp();
  });
};

function employees() {
  db.query("SELECT * FROM employee", function (err, res){
    if (err) throw err;
    res.forEach(element => {
      switch (element.role_id) {
        case 1:
          return element.role_id = "Sales Lead";
        case 2:
          return element.role_id = "Salesperson";
        case 3:
          return element.role_id = "Lead Engineer";
        case 4:
          return element.role_id = "Software Engineer";
        case 5:
          return element.role_id = "Account Manager";
        case 6:
          return element.role_id = "Accountant";
        case 7:
          return element.role_id = "Legal Team Lead";
        case 8:
          return element.role_id = "Lawyer";
      };
    });
    console.table(res);
    startApp();
  })
}

function addDepartment() {
  inquirer.prompt(
    {
      name: "newDepartment",
      type: "input",
      message: "What is the name of the new department?",
    }
  )
  .then((res) =>{
    const query = {
      name: res.newDepartment,
    };
    db.query("INSERT INTO department SET ?", query, (err)=> {
      if (err) throw err;
      startApp();
    });
  });
};

startApp();