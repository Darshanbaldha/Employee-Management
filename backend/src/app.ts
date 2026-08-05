import express from "express";
import cors from "cors"
import databaseConn from "./db/conn.js";
import employeeRouter from "./routes/employee.routes.js";
import authRouter from "./routes/auth.route.js";

const app = express();

if (!process.env.PORT) {
    throw new Error("Port is missing.")
}
const PORT: number = Number(process.env.PORT);

// Middleware
app.use(cors());
app.use(express.json());

// Database connection.
databaseConn;

// Routes.
app.use("/employee", employeeRouter);
app.use("/auth", authRouter);

// Server connection.
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})