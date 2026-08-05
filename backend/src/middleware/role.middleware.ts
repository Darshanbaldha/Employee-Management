import type { NextFunction, Response } from "express"
import type { AuthRequest } from "../types/AuthRequest.js"

export const authorize = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({
                message: "Unauthorized."
            });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                message: "Access forbidden."
            });
            return;
        }
        next();
    }
}