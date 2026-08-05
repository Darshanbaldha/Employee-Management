import express from "express";
import { createEmployee, deleteEmployee, getCities, getEmployee, getEmployyStatic, updateEmployee } from "../controllers/employee.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { employeeValidation } from "../validators/employee.validator.js";
import { validate } from "../middleware/validation.middleware.js";

const employeeRouter = express.Router();

employeeRouter.post("/", authenticate, authorize(["admin"]), employeeValidation, validate, createEmployee)
employeeRouter.get("/", authenticate, authorize(["admin", "employee"]), getEmployee)
employeeRouter.put("/:id", authenticate, authorize(["admin"]), employeeValidation, validate, updateEmployee)
employeeRouter.delete("/:id", authenticate, authorize(["admin"]), deleteEmployee)
employeeRouter.get("/cities", authenticate, authorize(["admin", "employee"]), getCities)
employeeRouter.get("/state", authenticate, authorize(["admin"]), getEmployyStatic)

export default employeeRouter