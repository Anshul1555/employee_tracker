import inquirer from "inquirer";
import { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from "./src/routes/queries.js";

const mainMenu = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add an Employee",
                "Update an Employee Role",
                "Add a Role",
                "View All Roles",
                "View All Departments",
                "Add a Department",
                "Exit"
            ]
        }
    ]);

    switch (choice) {
        case "View All Employees":
            console.table(await getEmployees());
            break;
        case "Add an Employee":
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                { type: "input", name: "firstName", message: "Enter first name:" },
                { type: "input", name: "lastName", message: "Enter last name:" },
                { type: "input", name: "roleId", message: "Enter role ID:" },
                { type: "input", name: "managerId", message: "Enter manager ID (or leave blank):" }
            ]);
            await addEmployee(firstName, lastName, parseInt(roleId), managerId ? parseInt(managerId) : null);
            console.log(`Added employee: ${firstName} ${lastName}`);
            break;
        case "Update an Employee Role":
            const { employeeId, newRoleId } = await inquirer.prompt([
                { type: "input", name: "employeeId", message: "Enter employee ID to update:" },
                { type: "input", name: "newRoleId", message: "Enter new role ID:" }
            ]);
            await updateEmployeeRole(parseInt(employeeId), parseInt(newRoleId));
            console.log(`Updated employee ID ${employeeId} to role ID ${newRoleId}`);
            break;
        
        case "View All Roles":
            console.table(await getRoles());
            break;
        case "Add a Role":
            const { title, salary, departmentId } = await inquirer.prompt([
                { type: "input", name: "title", message: "Enter role title:" },
                { type: "input", name: "salary", message: "Enter salary:" },
                { type: "input", name: "departmentId", message: "Enter department ID:" }
            ]);
            await addRole(title, parseFloat(salary), parseInt(departmentId));
            console.log(`Added role: ${title}`);
            break;
        case "View All Departments":
            console.table(await getDepartments());
            break;
        case "Add a Department":
            const { departmentName } = await inquirer.prompt([
                { type: "input", name: "departmentName", message: "Enter department name:" }
            ]);
            await addDepartment(departmentName);
            console.log(`Added department: ${departmentName}`);
            break;
        case "Exit":
            process.exit();
    }

    mainMenu();
};

// Start the Inquirer prompt
mainMenu();
