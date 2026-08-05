import type { Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;

        // check user exist or not.
        const existUser = await User.findOne({ email });

        if (existUser) {
            res.status(400).json({ message: "User already exists." })
            return;
        }

        // Convert password into hash password.
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashedPassword, role })

        if (user) {
            res.status(201).json({ message: "User created successfully.", user })
        }
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to register user.";
        res.status(500).json({ message })
    }
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // check user exist or not. 
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: "User not found." });
            return;
        }

        // compare password.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid email or password." })
            return;
        }

        // Generate jwt token.
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        )

        res.status(200).json({ message: "Login successfull.", token, user })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Login Failed.";
        res.status(500).json({ message })
    }
}

export { registerUser, loginUser }