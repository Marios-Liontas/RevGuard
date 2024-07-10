import express from 'express';
import 'dotenv/config'; 
import mongoose from 'mongoose';
import registerRoute from './routes/register.js'; 
import loginRoute from './routes/login.js'; 
import revenueRoutes from "./routes/revenue.js";
import cors from "cors";
import cookieParser from "cookie-parser"
import expenseRoutes from "./routes/expense.js"

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', revenueRoutes);
app.use('/api', expenseRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});