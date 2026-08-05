import express from "express"
import { loginUser, registerUser } from "../controllers/auth.controller.js"
import { loginValidation, registerValidation } from "../validators/auth.validator.js"
import { validate } from "../middleware/validation.middleware.js"

const authRouter = express.Router()

authRouter.post("/register", registerValidation, validate, registerUser)
authRouter.post("/login", loginValidation, validate, loginUser)

export default authRouter;