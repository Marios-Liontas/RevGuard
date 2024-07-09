import User from "../models/user.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import verifyToken from "../middleware/verifyJWT.js"

const router = express.Router();

//api/login

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });

        res.cookie('auth_token', token, {
            httpOnly: true,
            maxAge: 86400000,
        });

        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.get("/validate-token",verifyToken, (req, res) => {
    res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req, res) => {
    res.clearCookie('auth_token');
    res.status(200).json({ message: "Logged out Successfully" });
});

export default router;