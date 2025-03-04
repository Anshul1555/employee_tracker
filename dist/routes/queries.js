import { pool } from "./connection.js";
// Get all departments
export const getDepartments = async () => {
    const result = await pool.query("SELECT * FROM departments;");
    return result.rows;
};
// Get all roles
export const getRoles = async () => {
    const result = await pool.query(`
        SELECT roles.role_id, roles.title, roles.salary, departments.department_name 
        FROM roles 
        JOIN departments ON roles.department_id = departments.department_id;
    `);
    return result.rows;
};
// Get all employees
export const getEmployees = async () => {
    const result = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, 
               m.first_name AS manager_first_name, m.last_name AS manager_last_name
        FROM employees e
        JOIN roles r ON e.role_id = r.role_id
        JOIN departments d ON r.department_id = d.department_id
        LEFT JOIN employees m ON e.manager_id = m.id;
    `);
    return result.rows;
};
// Add a department
export const addDepartment = async (departmentName) => {
    const result = await pool.query("INSERT INTO departments (department_name) VALUES ($1) RETURNING *;", [departmentName]);
    return result.rows[0];
};
// Add a role
export const addRole = async (title, salary, departmentId) => {
    const result = await pool.query("INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;", [title, salary, departmentId]);
    return result.rows[0];
};
// Add an employee
export const addEmployee = async (firstName, lastName, roleId, managerId) => {
    const result = await pool.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;", [firstName, lastName, roleId, managerId]);
    return result.rows[0];
};
// Update an employee's role
export const updateEmployeeRole = async (employeeId, newRoleId) => {
    const result = await pool.query("UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *;", [newRoleId, employeeId]);
    return result.rows[0];
};
