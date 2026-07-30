import mongoose from "mongoose";

// Interface for Schema.
export interface IEmployee {
    name: string;
    age: number;
    city: string;
}

// Schema of employee table.
const employSchema = new mongoose.Schema<IEmployee>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: 2,
            maxlength: 50,
            trim: true
        },
        age: {
            type: Number,
            required: [true, "Age is required"],
            min: 0,
        },
        city: {
            type: String,
            required: [true, "Name is required"],
            minlength: 2,
            maxlength: 50,
            trim: true
        }
    },
    { timestamps: true }
)

export const Employee = mongoose.model("employees", employSchema)