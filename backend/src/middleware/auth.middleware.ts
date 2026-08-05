import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest } from "../types/AuthRequest.js";

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(400).json({ message: "Access denied. Token missing." })
        return;
    }

    const token = authHeader.split(" ")[1] as string;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
        req.user = decoded;

        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token." })
    }
}