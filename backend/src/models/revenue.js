import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema({
    amount: { type: Number, required: true, },
    date: { type: Date, required: true, default: Date.now},
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true});

const Revenue = mongoose.model("Revenue", revenueSchema);

export default Revenue;