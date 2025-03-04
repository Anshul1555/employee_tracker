import { pool } from "./connection.js";
// Get all employees
export const getEmployees = async () => {
    const result = await pool.query("SELECT * FROM employees;");
    return result.rows;
};
// Sync employee_id sequence
export const syncEmployeeSequence = async () => {
    await pool.query(`
        SELECT setval(pg_get_serial_sequence('employees', 'id'),
        COALESCE((SELECT MAX(id) FROM employees), 1));
    `);
};
// Update an employee's role
export const updateEmployeeRole = async (employeeId, newRoleId) => {
    const result = await pool.query("UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *;", [newRoleId, employeeId]);
    return result.rows[0];
};
// Add an employee (with sequence sync)
export const addEmployee = async (firstName, lastName, roleId, managerId) => {
    try {
        await syncEmployeeSequence(); // Ensure employee ID sequence is in sync
        const result = await pool.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;", [firstName, lastName, roleId, managerId]);
        console.log(`Added employee: ${firstName} ${lastName}`);
        return result.rows[0]; // Return the newly added employee
    }
    catch (err) {
        console.error("Error adding employee:", err);
    }
};
// Sync department_id sequence
export const syncDepartmentSequence = async () => {
    await pool.query(`
        SELECT setval(pg_get_serial_sequence('departments', 'department_id'),
        COALESCE((SELECT MAX(department_id) FROM departments), 1));
    `);
};
// Get all departments
export const getDepartments = async () => {
    const result = await pool.query("SELECT * FROM departments;");
    return result.rows;
};
// Add a department (with sequence sync)
export const addDepartment = async (departmentName) => {
    try {
        await syncDepartmentSequence(); // Ensure sequence is in sync
        const result = await pool.query(`INSERT INTO departments (department_name) 
            VALUES ($1) 
            ON CONFLICT (department_name) DO NOTHING 
            RETURNING *;`, [departmentName]);
        if (result.rows.length === 0) {
            console.log(`Department "${departmentName}" already exists.`);
            return null;
        }
        else {
            console.log(`Added department: ${departmentName}`);
            return result.rows[0];
        }
    }
    catch (err) {
        console.error("Error adding department:", err);
    }
};
// Get all roles
export const getRoles = async () => {
    const result = await pool.query("SELECT * FROM roles;");
    return result.rows;
};
// Sync role_id sequence
export const syncRoleSequence = async () => {
    await pool.query(`
        SELECT setval(pg_get_serial_sequence('roles', 'role_id'),
        COALESCE((SELECT MAX(role_id) FROM roles), 1));
    `);
};
// Add a role (with sequence sync)
export const addRole = async (title, salary, departmentId) => {
    try {
        await syncRoleSequence(); // Ensure role_id sequence is in sync
        const result = await pool.query("INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;", [title, salary, departmentId]);
        console.log(`Added role: ${title}`);
        return result.rows[0];
    }
    catch (err) {
        console.error("Error adding role:", err);
    }
};
