import { Error } from "mongoose";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import cloudinary from "../lib/cloudinary.js"

export const singup = async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log(fullName, email, password)
    try {
        if (!fullName || !email || !password) {
            throw new Error("Internal server error")
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters" })
        }
        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ message: "email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            //generate jwt token here
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })

        } else {
            res.status(400).json({ message: "Invalied user data" })
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server Error" })

    }



}




export const login = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isPassWordCorrect = await bcrypt.compare(password, user.password);
        if (!isPassWordCorrect) {
            return res.status(400).json({ message: "INVALID credentials" })
        }

        generateToken(user._id, res);

        res.status(200).json({message:"Login successfull",
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" })
    }



}

export const logout = (req, res) => {

    try {
        res.cookie("jwt","",{mazAge:0})
        res.status(200).json({message:"Log out successfull"})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" })
    }



}

export const updateProfile=async(req,res)=>{
    try {
        const{profilePic}=req.body;
        const userId= req.user._id

        if(profilePic){
            return res.status(400).json({message:"Profile pic is required"})
        }

        const uploadResponse= await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const checkAuth = async(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}
