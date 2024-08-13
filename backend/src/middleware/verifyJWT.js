import jwt from "jsonwebtoken";

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    // Retrieve the token from the 'auth_token' cookie
    const token = req.cookies['auth_token'];

    // If no token is found, respond with a 401 Unauthorized status
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verify the token using the secret key stored in environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach the decoded user ID to the request object for later use
        req.userId = decoded.userId;

        next();
    } catch (error) {
        // If the token is invalid or verification fails, respond with a 401 Unauthorized status
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default verifyToken;
