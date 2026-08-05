import express from "express";
import cors from "cors"
import databaseConn from "./db/conn.js";
import employeeRouter from "./routes/employee.routes.js";
import authRouter from "./routes/auth.route.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

if (!process.env.PORT) {
    throw new Error("Port is missing.")
}
const PORT: number = Number(process.env.PORT);

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.json());

// Helmet adds common security headers to protect against attacks like XSS, clickjacking, MIME sniffing, etc.
app.use(helmet());

// Limits repeated requests from the same IP.   
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests. Please try again later.",
});
app.use(limiter)

// Removes the header X-Powered-By: Express so attackers don't know your backend uses Express.
app.disable("x-powered-by");

// Database connection.
databaseConn;

// Routes.
app.use("/employee", employeeRouter);
app.use("/auth", authRouter);

// Server connection.
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})