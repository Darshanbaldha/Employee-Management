import type { Request, Response } from "express"
import { Employee } from "../models/employee.model.js";

// Create Employee Entry and send response.
const createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, age, city } = req.body;
        const result = await Employee.create({ name, age, city })
        res.status(200).json({ message: "Employee created", result })
    } catch (error: any) {
        res.status(400).json({ message: error.message || "Faild to create employee." })
    }
}

// Fetch Employee and send response.
const getEmployee = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await Employee.find();
        res.status(200).json({ message: "Employee Fetched.", result })
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Failed to fetch employee." })
    }
}

// Update Employee Data and send Response.
const updateEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { name, age, city } = req.body

        const result = await Employee.findByIdAndUpdate(id, { name, age, city }, { returnDocument: 'after', runValidators: true })

        if (!result) {
            res.status(404).json({ message: "Employee not found." });
            return;
        }

        res.status(200).json({ message: "Employee update successfully.", result })

    } catch (error: any) {
        res.status(400).json({ message: error.message || "Failed to update employee." })
    }
}

// Delete Employee Data.
const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await Employee.findByIdAndDelete(id)

    if (!result) {
        res.status(404).json({ message: "Employee not found." })
        return;
    }

    res.status(200).json({ message: "Employee deleted", result })
}

export { createEmployee, getEmployee, updateEmployee, deleteEmployee }