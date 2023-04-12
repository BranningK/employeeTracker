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

async function addRole() {
  const data = await db.promise().query("SELECT * FROM department;");
  const departmentList = await data[0].map(({ name, id }) => ({
      name: name,
      value: id,
  }));
  inquirer.prompt([
    {
      name: "roleName",
      type: "input",
      message: "What is the name of the new role?"
    },
    {
      name: "roleSalary",
      type: "number",
      message: "What is the salary for the new role?"
    },
    {
      name: "roleDepartment",
      type: "list",
      choices: departmentList,
      message: "What department does this role belong to?"
    }
  ])
  .then((res => {
    const newRole = {
      title: res.roleName,
      salary: res.roleSalary,
      department_id: res.roleDepartment
    };

    db.query("INSERT INTO role SET ?", newRole, (err) => {
      if (err) throw err;
      startApp();
    });
  }));
}

async function addEmployee() {
  const departmentData = await db.promise().query("SELECT * FROM department;");
  const departmentList = await departmentData[0].map(({ name, id }) => ({
    name: name,
    id: id,
  }));
  inquirer.prompt([
    {
      name: "employeeFirstName",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
      name: "employeeLastName",
      type: "input",
      message: "What is the employee's last name?"
    },
    {
      name: "employeeDepartment",
      type: "list",
      choices: departmentList,
      message: "What department does the employee belong to?"
    },
  ])
  .then((async res => {
    console.log(res);
    console.log("res.empdept:",res.employeeDepartment)
    const newEmployeeFirst = res.employeeFirstName;
    const newEmployeeLast = res.employeeLastName;
    const managerData = await db.promise().query("SELECT * FROM employee WHERE manager_id IS NULL")
    const managerList = await managerData[0].map(({ first_name, last_name, manager_id, id }) => ({
      name: (first_name + " " + last_name),
      value: id
    }));
    switch (res.employeeDepartment) {
      case "Sales" :
        const salesData = await db.promise().query("SELECT * FROM role WHERE department_id=1;");
        const salesList = await salesData[0].map(({ title, id }) => ({
          name: title,
          value: id,
        }));
        inquirer.prompt([
          {
            name: "employeeRole",
            type: "list",
            choices: salesList,
            message: "What is the employee's role?"
          },
          {
            name: "manager",
            type: "list",
            choices: managerList,
            message: "Who is the employee's manager?"
          }
        ])
        .then((res => {
          const newEmployee = {
            first_name: newEmployeeFirst,
            last_name: newEmployeeLast,
            role_id: res.employeeRole,
            manager_id: res.manager
          };
          db.query("INSERT INTO employee SET ?", newEmployee, (err)=> {
            if (err) throw err;
            startApp();
          });
        }))
        break;
      case "Engineering":
        const engineeringData = await db.promise().query("SELECT * FROM role WHERE department_id=2;");
        const engineeringList = await engineeringData[0].map(({ title, id }) => ({
          name: title,
          value: id,
        }));
        inquirer.prompt([
          {
            name: "employeeRole",
            type: "list",
            choices: engineeringList,
            message: "What is the employee's role?"
          },
          {
            name: "manager",
            type: "list",
            choices: managerList,
            message: "Who is the employee's manager?"
          }
        ])
        .then((res => {
          const newEmployee = {
            first_name: newEmployeeFirst,
            last_name: newEmployeeLast,
            role_id: res.employeeRole,
            manager_id: res.manager
          };
          db.query("INSERT INTO employee SET ?", newEmployee, (err)=> {
            if (err) throw err;
            startApp();
          });
        }))
        break;
      case "Finance": 
        const financeData = await db.promise().query("SELECT * FROM role WHERE department_id=3;");
        const financeList = await financeData[0].map(({ title, id }) => ({
          name: title,
          value: id,
        }));
        inquirer.prompt([
          {
            name: "employeeRole",
            type: "list",
            choices: financeList,
            message: "What is the employee's role?"
          },
          {
            name: "manager",
            type: "list",
            choices: managerList,
            message: "Who is the employee's manager?"
          }
        ])
        .then((res => {
          const newEmployee = {
            first_name: newEmployeeFirst,
            last_name: newEmployeeLast,
            role_id: res.employeeRole,
            manager_id: res.manager
          };
          db.query("INSERT INTO employee SET ?", newEmployee, (err)=> {
            if (err) throw err;
            startApp();
          });
        }))
        break;
      case "Legal":
        const legalData = await db.promise().query("SELECT * FROM role WHERE department_id=4;");
        const legalList = await legalData[0].map(({ title, id }) => ({
          name: title,
          value: id,
        }));
        inquirer.prompt([
          {
            name: "employeeRole",
            type: "list",
            choices: legalList,
            message: "What is the employee's role?"
          },
          {
            name: "manager",
            type: "list",
            choices: managerList,
            message: "Who is the employee's manager?"
          }
        ])
        .then((res => {
          const newEmployee = {
            first_name: newEmployeeFirst,
            last_name: newEmployeeLast,
            role_id: res.employeeRole,
            manager_id: res.manager
          };
          db.query("INSERT INTO employee SET ?", newEmployee, (err)=> {
            if (err) throw err;
            startApp();
          });
        }))
        break;
    };
  }))
}

async function updateRole(){
  const rolesRaw = await db.promise().query("SELECT * FROM role;");
  const roles = await rolesRaw[0].map(({ title, id }) => ({
    name: title,
    value: id,
  }));
  //console.log("Roles: ", roles);
  const employeesRaw = await db.promise().query("SELECT * FROM employee;");
  const employees = await employeesRaw[0].map(({ first_name, last_name, id }) => ({
    name: (first_name + " " + last_name),
    value: id,
  }));
  //console.log("Employees: ", employees);

  inquirer.prompt([
    {
      name: "employee",
      type: "list",
      choices: employees,
      message: "Which employee do you want to update?"
    },
    {
      name: "role",
      type: "list",
      choices: roles,
      message: "What do you want their role to be?"
    }
  ])
  .then(res => {
    console.log("Res: ", res)
    db.query(`UPDATE employee SET role_id = ${res.role} WHERE id = ${res.employee}`, (err) => {
      if (err) throw err;
    });
    startApp();
  })
}

startApp();