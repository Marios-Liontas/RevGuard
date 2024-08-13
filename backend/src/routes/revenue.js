import Revenue from "../models/revenue.js";
import express from "express";
import verifyToken from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyToken); // Applying the token verification middleware to all routes in this router

// POST /new-revenue - Route for creating a new revenue entry
router.post("/new-revenue", async (req, res) => {
    try {
        // Destructure the relevant fields from the request body
        const { amount, date, description } = req.body;

        // Create a new Revenue instance with the provided data and the user ID from the token
        const revenue = new Revenue({
            amount,
            date,
            description,
            user: req.userId // The user ID is extracted from the verified token
        });

        // Save the new revenue entry to the database
        await revenue.save();

        // Send a success response with the created revenue object
        res.status(201).json(revenue);
    } catch (error) {
        // Send a bad request response if there's an error
        res.status(400).json(error.message);
    }
});

// GET /get-revenues - Route for retrieving all revenue records for the authenticated user
router.get("/get-revenues", async (req, res) => {
    try {
        const userId = req.userId; // Extract the user ID from the verified token
        const revenues = await Revenue.find({ user: userId }); // Find all revenue records for the authenticated user

        // Send a success response with the list of revenues
        res.status(200).json(revenues);
    } catch (error) {
        // Send a server error response if there's an issue
        res.status(500).json(error.message);
    }
});

// GET /get-revenue/:id - Route for retrieving a single revenue record by its ID
router.get("/get-revenue/:id", async (req, res) => {
    try {
        // Find the revenue record by its ID and ensure it belongs to the authenticated user
        const revenue = await Revenue.findOne({_id: req.params.id, user: req.userId});
        
        // If the revenue record is not found, return a 404 error
        if (!revenue) {
           return res.status(404).json({ message: "Revenue not found" });
        }

        // Send a success response with the revenue object
        res.status(200).json(revenue);
    } catch (error) {
        // Send a server error response if there's an issue
        res.status(500).json(error.message);
    }
});

// PATCH /edit-revenue/:id - Route for editing an existing revenue record
router.patch("/edit-revenue/:id", async (req, res) => {
    try {
        // Find the revenue record by its ID and update it with the new data, ensuring it belongs to the authenticated user
        const revenue = await Revenue.findOneAndUpdate(
            {
                _id: req.params.id, // The ID of the revenue record to be updated
                user: req.userId // Ensure the record belongs to the authenticated user
            },
            req.body, // The new data to update the revenue record with
            {
                new: true // Return the updated document
            }
        );

        // If the revenue record is not found, return a 404 error
        if (!revenue) {
          return res.status(404).json({ message: "Cannot find revenue" });
        }

        // Send a success response with the updated revenue object
        res.status(200).json(revenue);
    } catch (error) {
        // Send a server error response if there's an issue
        res.status(500).json(error.message);
    }
});

// DELETE /delete-revenue/:id - Route for deleting a revenue record
router.delete("/delete-revenue/:id", async (req, res) => {
    try {
        // Find the revenue record by its ID and delete it, ensuring it belongs to the authenticated user
        const revenue = await Revenue.findOneAndDelete({_id: req.params.id, user: req.userId});

        // If the revenue record is not found, return a 404 error
        if (!revenue) {
           return res.status(404).json({ message: "Cannot find and delete the required revenue" });
        }

        // Send a success response with the deleted revenue object
        res.status(200).json(revenue);
    } catch (error) {
        // Send a server error response if there's an issue
        res.status(500).json(error.message);
    }
});

export default router;
