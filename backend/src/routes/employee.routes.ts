import express from "express";
import { createEmployee, deleteEmployee, getCities, getEmployee, getEmployyStatic, updateEmployee } from "../controllers/employee.controller.js";

const employeeRouter = express.Router();

employeeRouter.post("/", createEmployee)
employeeRouter.get("/", getEmployee)
employeeRouter.put("/:id", updateEmployee)
employeeRouter.delete("/:id", deleteEmployee)
employeeRouter.get("/cities", getCities)
employeeRouter.get("/state", getEmployyStatic)

export default employeeRouter