import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Database user Schema definition
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true
    },
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    // If the password field has been modified (or is new), hash it
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8); // Hashing the password with a salt factor of 8
    }
    next(); // Continue with the save operation
});

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

export default User;
