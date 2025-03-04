import { pool } from "./connection.js";
import express, { Request, Response } from "express";
import { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee } from "../routes/queries.js";


const router = express.Router();

// GET all departments
router.get("/departments", async (_req: Request, res: Response) => {
    try {
        const data = await getDepartments();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// GET all roles
router.get("/roles", async (_req: Request, res: Response) => {
    try {
        const data = await getRoles();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// GET all employees
router.get("/employees", async (_req: Request, res: Response) => {
    try {
        const data = await getEmployees();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// POST add department
router.post("/departments", async (req: Request, res: Response) => {
    try {
        const { departmentName } = req.body;
        if (!departmentName) {
            return res.status(400).json({ error: "Department name is required" });
        }
        const newDepartment = await addDepartment(departmentName);
        return res.status(201).json(newDepartment); // Ensure the return here
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" }); // Return on error
    }
});

// POST add role
router.post("/roles", async (req: Request, res: Response) => {
    try {
        const { title, salary, departmentId } = req.body;
        if (!title || !salary || !departmentId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newRole = await addRole(title, salary, departmentId);
        return res.status(201).json(newRole); // Ensure the return here
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" }); // Return on error
    }
});

// POST add an employee
router.post("/employees", async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, roleId, managerId } = req.body;
        if (!firstName || !lastName || !roleId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const newEmployee = await addEmployee(firstName, lastName, roleId, managerId || null);
        return res.status(201).json(newEmployee); // Ensure the return here
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" }); // Return on error
    }
});

export default router;
