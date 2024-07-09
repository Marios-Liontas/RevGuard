import express from "express";
import User from "../models/user.js"
import jwt from "jsonwebtoken";

const router = express.Router();

//api/register

router.post("/register", async (req, res) => {
   try {
        let user = await User.findOne({
           email: req.body.email,
        });

       if (user) {
          return res.status(400).json({ message: "User already exists" });
       }

        user = new User(req.body);
      await user.save();

      const token = jwt.sign({
         userId: user._id
      }, process.env.JWT_SECRET_KEY, {
         expiresIn: "1d"
      });

      res.cookie('auth_token', token, {
         httpOnly: true,
         maxAge:86400000
      });

      res.status(201).json({ message: "User registered successfully" });
   } catch (error) {
      console.error("Error during registration", error);
      res.status(500).json({message:"Internal server error, something went wrong"})
   }

});

export default router;