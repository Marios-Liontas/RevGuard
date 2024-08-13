import Expense from "../models/expense.js";
import express from "express"; 
import verifyToken from "../middleware/verifyJWT.js"; 

const router = express.Router();

// Apply the verifyToken middleware to all routes in this router
router.use(verifyToken);

// Route to create a new expense
router.post("/new-expense", async (req, res) => {
    try {
        const { amount, date, category, description } = req.body;

        // Create a new Expense document with the provided data and the userId from the token
        const expense = new Expense({
            amount,
            date,
            description,
            category,
            user: req.userId
        });

        // Save the expense to the database
        await expense.save();

        // Send a response with status 201 and the saved expense
        res.status(201).json(expense);
    } catch (error) {
        // If an error occurs, send a 400 status and the error message
        res.status(400).json(error.message);
    }
});

// Route to get all expense records for the authenticated user
router.get("/get-expenses", async (req, res) => {
    try {
        // Get the userId from the token
        const userId = req.userId;

        // Find all expenses for the authenticated user
        const expenses = await Expense.find({ user: userId });

        // Send a response with status 200 and the list of expenses
        res.status(200).json(expenses);
    } catch (error) {
        // If an error occurs, send a 500 status and the error message
        res.status(500).json(error.message);
    }
});

// Route to get a single expense record by its ID
router.get("/get-expense/:id", async (req, res) => {
    try {
        // Find the expense by its ID and the userId from the token
        const expense = await Expense.findOne({_id: req.params.id, user: req.userId});

        // If no expense is found, send a 404 status and a message
        if (!expense) {
           return res.status(404).json({ message: "Expense not found" })
        }

        // If found, send a response with status 200 and the expense data
        res.status(200).json(expense);
    } catch (error) {
        // If an error occurs, send a 500 status and the error message
        res.status(500).json(error.message);
    }
});

// Route to edit an existing expense
router.patch("/edit-expense/:id", async (req, res) => {
    try {
        // Find the expense by its ID and the userId, then update it with the request body
        const expense = await Expense.findOneAndUpdate({
            _id: req.params.id, user: req.userId
        },
            req.body, {
            new: true // Return the updated expense document
        });

        // If no expense is found, send a 404 status and a message
        if (!expense) {
          return res.status(404).json({ message: "Cannot find expense" });
        }

        // If updated, send a response with status 200 and the updated expense
        res.status(200).json(expense);
    } catch (error) {
        // If an error occurs, send a 500 status and the error message
        res.status(500).json(error.message);
    }
});

// Route to delete an expense
router.delete("/delete-expense/:id", async (req, res) => {
    try {
        // Find the expense by its ID and the userId, then delete it
        const expense = await Expense.findOneAndDelete({_id: req.params.id, user: req.userId});

        // If no expense is found, send a 404 status and a message
        if (!expense) {
           return res.status(404).json({ message: "Cannot find and delete the required expense" });
        }

        // If deleted, send a response with status 200 and the deleted expense data
        res.status(200).json(expense);
    } catch (error) {
        // If an error occurs, send a 500 status and the error message
        res.status(500).json(error.message);
    }
});

export default router;
