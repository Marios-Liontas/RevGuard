import Expense from "../models/expense.js";
import express from "express";
import verifyToken from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyToken);

//Create a new expense
router.post("/new-expense", async (req, res) => {
    try {
        const { amount, date, category, description } = req.body;

        const expense = new Expense({
            amount,
            date,
            description,
            category,
            user: req.userId
        });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json(error.message);
    }
});


//Get all expense records
router.get("/get-expenses", async (req, res) => {
    try {
        const userId = req.userId;
        const expenses = await Expense.find({ user: userId });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//Get expense record by id
router.get("/get-expense/:id", async (req, res) => {
    try {
        const expense = await Expense.findOne({_id: req.params.id, user: req.userId});
        if (!expense) {
           return res.status(404).json({ message: "Expense not found" })
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//Edit an expense
router.patch("/edit-expense/:id", async (req, res) => {
    try {
        const expense = await Expense.findOneAndUpdate({
            _id: req.params.id, user: req.userId
        },
            req.body, {
            new: true
        });
        if (!expense) {
          return res.status(404).json({ message: "Cannot find expense" });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//Delete an expense
router.delete("/delete-expense/:id", async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({_id: req.params.id, user: req.userId});
        if (!expense) {
           return res.status(404).json({ message: "Cannot find and delete the required expense" });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

export default router;