const { createPromptModule } = require("inquirer");
const db = require("./db");

async function dbtest() {
  try {
    const res = await db.query("SELECT NOW()");
    await db.end();
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
  console.log(answers)
}
menu();
