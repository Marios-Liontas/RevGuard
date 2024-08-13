import User from "../models/user.js"; 
import express from "express"; 
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt"; 
import verifyToken from "../middleware/verifyJWT.js"; 

const router = express.Router();

// POST /api/login - Route for user login
router.post("/login", async (req, res) => {
    const { email, password } = req.body; 

    try {
        // Finding a user with the provided email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" }); // If user not found, return error
        }

        // Comparing the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid Credentials" }); // If passwords don't match, return error
        }

        // If credentials are valid, create a JWT token
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d", // Token expires in 1 day
        });

        // Setting the JWT token as a cookie in the response
        res.cookie('auth_token', token, {
            httpOnly: true, // Cookie is accessible only by the web server
            maxAge: 86400000, // Cookie will expire in 1 day
        });

        // Sending a success response
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// GET /api/validate-token - Route to validate JWT and return user ID
router.get("/validate-token", verifyToken, (req, res) => {
    res.status(200).send({ userId: req.userId }); // If token is valid, send the userId from the token
});

// POST /api/logout - Route for user logout
router.post("/logout", (req, res) => {
    res.clearCookie('auth_token'); // Clear the auth token cookie
    res.status(200).json({ message: "Logged out Successfully" }); // Send a success response
});

export default router;
