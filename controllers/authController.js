import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId)=> {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET,{
        expiresIn: "7d",
    } );
};

// 👉 Register a NEW USER
export const registerUser = async (req, res)=> {
    try {
        const {name, email, password, address} = req.body;

        // check if the user already exists ?
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "Email already registered!"});
        }
        // Create new User
        const user = await User.create({
            name,
            email,
            password,
            address
        });
        // Respond with user info and Token
        res.status(201).json({
            message: "User registered successfully!",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address
            },
            token: generateToken(user._id)
        });
    } 
    catch(error){
        console.error("Registration error:", error.message);
        res.status(500).json({ message: "server error during registration" });
    }
};

// 👉 Login User
export const loginUser = async (req, res) => {
    try{
        const{ email, password } = req.body;

        // check if the user exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message: "Invalid Email"});
        }

        // Check password match
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Password"});
        }

        // Successful Login 👍
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address
            },
            token: generateToken(user._id),
        });
    } catch(error){
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "server error during Login"});
    }
};
