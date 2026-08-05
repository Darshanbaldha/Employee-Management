import mongoose from "mongoose"

export interface Iuser {
    name: string,
    email: string,
    password: string,
    role: "admin" | "employee"
}

const userSchema = new mongoose.Schema<Iuser>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        default: "employee",
    }
}, { timestamps: true })

export const User = mongoose.model("users", userSchema)