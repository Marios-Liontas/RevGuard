import mongoose from "mongoose";

// Define the schema for a revenue entry in the database
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
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, 
{ 
    timestamps: true  
});

// Create the model from the schema
const Revenue = mongoose.model("Revenue", revenueSchema);

export default Revenue;
