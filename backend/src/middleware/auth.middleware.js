import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "unauthorized - no token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded); // Log decoded token to verify

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("password");
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
