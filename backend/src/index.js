import express from 'express';
import 'dotenv/config'; 
import mongoose from 'mongoose';
import registerRoute from './routes/register.js'; 
import loginRoute from './routes/login.js'; 
import revenueRoutes from "./routes/revenue.js";
import cors from "cors";
import cookieParser from "cookie-parser"
import expenseRoutes from "./routes/expense.js"
import path from "path";
import { fileURLToPath } from 'url';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Routes
app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', revenueRoutes);
app.use('/api', expenseRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});