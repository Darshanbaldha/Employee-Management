import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";

if (!process.env.MONGO_URL) {
    throw new Error("Database connection string is missing.")
}
// Takes url
const MONGO_URL: string = process.env.MONGO_URL;

// Connection with database.
const databaseConn = mongoose.connect(MONGO_URL).then(
        () => console.log("Database Connected.")
).catch((err) => {
    console.error(`Database connection error: ${err}`);
    process.exit(1);
})

export default databaseConn;