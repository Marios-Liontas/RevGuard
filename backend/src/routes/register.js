import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST /api/register - Route for user registration
router.post("/register", async (req, res) => {
   try {
        // Check if a user with the provided email already exists
        let user = await User.findOne({
           email: req.body.email,
        });

       // If the user already exists, return an error response
       if (user) {
          return res.status(400).json({ message: "User already exists" });
       }

        // If the user doesn't exist, create a new user with the data from the request body
        user = new User(req.body);
        await user.save(); // Save the new user to the database

        // Generate a JWT token for the newly registered user
        const token = jwt.sign({
           userId: user._id // Store the user ID in the token payload
        }, process.env.JWT_SECRET_KEY, {
           expiresIn: "1d" // Token expires in 1 day
        });

        // Set the JWT token as a cookie in the response
        res.cookie('auth_token', token, {
           httpOnly: true, // Cookie is accessible only by the web server
           maxAge: 86400000 // Cookie will expire in 1 day
        });

        // Send a success response with a registration message
        res.status(201).json({ message: "User registered successfully" });
   } catch (error) {
      console.error("Error during registration", error);
      res.status(500).json({message:"Internal server error, something went wrong"});
   }
});

export default router;
