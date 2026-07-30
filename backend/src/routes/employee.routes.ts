import express from "express";
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from "../controllers/employee.controller.js";

const employeeRouter = express.Router();

employeeRouter.post("/", createEmployee)
employeeRouter.get("/", getEmployee)
employeeRouter.put("/:id", updateEmployee)
employeeRouter.delete("/:id", deleteEmployee)

export default employeeRouter