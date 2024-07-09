import Revenue from "../models/revenue.js";
import express from "express";
import verifyToken from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyToken);

//Create a new revenue
router.post("/new-revenue", async (req, res) => {
    try {
        const { amount, date, description } = req.body;

        const revenue = new Revenue({
            amount,
            date,
            description,
            user: req.userId
        });
        await revenue.save();
        res.status(201).json(revenue);
    } catch (error) {
        res.status(400).json(error.message);
    }
});


//Get all revenue records
router.get("/get-revenues", async (req, res) => {
    try {
        const userId = req.userId;
        const revenues = await Revenue.find({ user: userId });
        res.status(200).json(revenues);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//Get revenue record by id
router.get("/get-revenue/:id", async (req, res) => {
    try {
        const revenue = await Revenue.findOne({_id: req.params.id, user: req.userId});
        if (!revenue) {
           return res.status(404).json({ message: "Revenue not found" })
        }
        res.status(200).json(revenue);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//Edit a revenue
router.patch("/edit-revenue/:id", async (req, res) => {
    try {
        const revenue = await Revenue.findOneAndUpdate({
            _id: req.params.id, user: req.userId
        },
            req.body, {
            new: true
        });
        if (!revenue) {
          return res.status(404).json({ message: "Cannot find revenue" });
        }
        res.status(200).json(revenue);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//Delete a revenue
router.delete("/delete-revenue/:id", async (req, res) => {
    try {
        const revenue = await Revenue.findOneAndDelete({_id: req.params.id, user: req.userId});
        if (!revenue) {
           return res.status(404).json({ message: "Cannot find and delete the required revenue" });
        }
        res.status(200).json(revenue);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

export default router;