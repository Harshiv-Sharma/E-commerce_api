import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const protect = async (req, res, next) => {
    let token;

    // Check for token in Authorization header
    if( req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        try{
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from decoded token, exclude password
            req.user = await User.findById(decoded.id).select("-password");

            // allow request to proceed
            next(); 
        }
        catch(error){
            console.error("Authorization error:", error.message);
            res.status(401).json({message: "Not Authorized, token failed" });
        }

    }
    if(!token){
        res.status(401).json({ message: "Not Authorized, NO TOKEN" });
    }
}

export default protect;