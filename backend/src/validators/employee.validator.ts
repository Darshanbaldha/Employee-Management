import { body } from "express-validator";

export const employeeValidation = [
    body("name").trim().notEmpty().withMessage("Name is required.").isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters."),

    body("age").notEmpty().withMessage("Age is required.").isInt({ min: 1, max: 120 }).withMessage("Age must be between 1 and 120."),

    body("city").trim().notEmpty().withMessage("City is required.").isLength({ min: 2, max: 50 }).withMessage("City must be between 2 and 50 characters.")
]