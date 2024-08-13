import mongoose from "mongoose";

// Define the schema for an expense entry in the database
const revenueSchema = new mongoose.Schema({
    amount: { 
        type: Number, 
        required: true,
    },
    date: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // References the 'User' model, linking this expense to a specific user
        required: true 
    }
}, 
{ 
    timestamps: true  
});

// Create the model from the schema
const Expense = mongoose.model("Expense", revenueSchema);

export default Expense;
