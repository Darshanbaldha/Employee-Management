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

// Index for searching employees by name
employSchema.index({ name: 1 });

// Index for filtering employees by city
// employSchema.index({ city: 1 });

// Index for sorting newest and oldest employees
// employSchema.index({ createdAt: -1 });

// Intex for text searching employees by name and city.
employSchema.index({name: "text", city: "text"})

export const Employee = mongoose.model("employees", employSchema)