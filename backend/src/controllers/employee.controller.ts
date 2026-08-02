import type { Request, Response } from "express"
import { Employee } from "../models/employee.model.js";

// Create Employee Entry and send response.
const createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, age, city } = req.body;
        const result = await Employee.create({ name, age, city })
        res.status(200).json({ message: "Employee created", result })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to create employee.";
        res.status(400).json({ message })
    }
}

// Fetch Employee and send response.
// Add search, filter and sort query.
const getEmployee = async (_req: Request, res: Response): Promise<void> => {
    try {
        // eigther takes the strings ot nothing("")
        const search = _req.query.search as string || "";
        const city = _req.query.city as string || "";
        const sort = _req.query.sort as string || "";

        // Current page number. Default = 1
        const page = Number(_req.query.page) || 1;

        // Records per page. Default = 5
        const limit = Number(_req.query.limit) || 5;

        // Number of records to skip
        const skip = (page - 1) * limit;

        const query: any = {
            name: {
                // Regex means partial search.
                $regex: search,
                // Making it case insensitive.
                $options: "i"
            }
        }

        if (city !== "") {
            // quert.city takes the value from city params. And add in the query along with name
            query.city = city;
        }

        // Sort Object
        let sortOption: any = {};

        switch (sort) {
            case "nameAsc":
                sortOption = { name: 1 };
                break;
            case "nameDesc":
                sortOption = { name: -1 };
                break;
            case "ageAsc":
                sortOption = { age: 1 };
                break;
            case "ageDesc":
                sortOption = { age: -1 };
                break;
            case "newest":
                sortOption = { createdAt: -1 };
                break;
            case "oldest":
                sortOption = { createdAt: 1 };
                break;
            default:
                sortOption = {};
        }

        // Count Records(Noumber of total employee). For create total Page numbers.
        const totalRecords = await Employee.countDocuments(query);
        const totalPages = Math.ceil(totalRecords / limit);

        // search by city or name and sort.
        const result = await Employee.find(query).sort(sortOption).skip(skip).limit(limit);
        res.status(200).json({ message: "Employee Fetched.", result, totalRecords, totalPages, currentPage: page })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to fetch employee.";
        res.status(500).json({ message })
    }
}

// Fetch All cities and send Response.
const getCities = async (_req: Request, res: Response): Promise<void> => {
    try {
        const cities = await Employee.distinct("city");
        res.status(200).json({ cities })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to fetch cities.";
        res.status(500).json({ message })
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

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to update employee.";
        res.status(400).json({ message })
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

export { createEmployee, getEmployee, updateEmployee, deleteEmployee, getCities }