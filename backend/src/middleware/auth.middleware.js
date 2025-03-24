import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        // Check if JWT is provided in the cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // Decode the token and verify its validity
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       

        // Check if the decoded token contains a valid userId
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        // Find the user by ID (ensure user exists)
        const user = await User.findById(decoded.UserId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach the user to the request object for use in the next middleware
        req.user = user;
        next(); // Pass control to the next handler
    } catch (error) {
        console.error("Error in protectRoute:", error.message); // Log the error message
        return res.status(500).json({ message: "Internal server error" });
    }
};
