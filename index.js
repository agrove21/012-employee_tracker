const { createPromptModule } = require("inquirer");
// const cTable = require('console.table');
const db = require("./db");

async function dbtest() {
  try {
    const res = await db.query("SELECT NOW()");
    // await db.end();
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
}

dbtest();
const prompt = createPromptModule();
async function menu() {
  const answers = await prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    },
  ]);
  switch (answers.action) {
    case "View all departments":
      viewDepartments();
      break;
    case "View all roles":
      viewRoles();
      break;
    case "View all employees":
      viewEmployees();
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
      updateEmployeeRole();
      break;
    case "Update an employee role":
      updateEmployeeRole();
      break;
    default:
      console.log("Goodbye");
      process.exit();
  }
}

async function viewDepartments() {
  const { rows } = await db.query("SELECT * FROM department");
  console.table(rows);
  menu();
}

async function viewRoles() {
  const { rows } =
    await db.query(`SELECT role.id, title, dpt.name AS department, salary 
        FROM role
        JOIN department dpt ON role.department_id = dpt.id`);
  console.table(rows);
  menu();
}

async function viewEmployees() {
  const { rows } =
    await db.query(`SELECT emp.id, emp.first_name, emp.last_name, role.title, 
        dpt.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
          FROM employee emp
          LEFT JOIN role ON role.id = emp.role_id
          LEFT JOIN department dpt ON role.department_id = dpt.id
          LEFT JOIN employee m ON emp.manager_id = m.id`);
  console.table(rows);
  menu();
}

async function addDepartment() {
  const answers = await prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the department name:",
    },
  ]);
  await db.query("INSERT INTO department(name) VALUES ($1)", [answers.name]);
  console.log("Department added successfully");
  menu();
}

async function addRole() {
  const { rows } = await db.query("SELECT * FROM department");
  const answers = await prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the role title:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary:",
    },
    {
      type: "list",
      name: "department_id",
      message: "Select the department:",
      choices: rows.map((dpt) => ({ name: dpt.name, value: dpt.id })),
    },
  ]);
  await db.query(
    "INSERT INTO role(title, salary, department_id) VALUES ($1, $2, $3)",
    [answers.title, +answers.salary, +answers.department_id]
  );
  console.log("Role added successfully");
  menu();
}

async function addEmployee() {
  const { rows } = await db.query("SELECT * FROM role");
  const result = await db.query("SELECT * FROM employee");
  const roles = rows.map((role) => ({ name: role.title, value: role.id }));
  const managers = result.rows.map((emp) => ({
    name: emp.first_name + " " + emp.last_name,
    value: emp.id,
  }));
  managers.push({
    name: "none",
    value: null,
  });

  const answers = await prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the first name:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the last name:",
    },
    {
      type: "list",
      name: "role_id",
      message: "Select the role:",
      choices: roles,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Select the manager:",
      choices: managers,
    },
  ]);
  await db.query(
    "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
    [
      answers.first_name,
      answers.last_name,
      +answers.role_id,
      answers.manager_id,
    ]
  );
  console.log("Employee added successfully");
  menu();
}
menu();
