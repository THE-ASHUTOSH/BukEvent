import e from "express";
import user from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
    const { username , email, password} = req.body;
    console.log(username, email, password);
    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are required to be filled"})
    }

    if(await user.findOne({$or: [{username: username}, {email: email}]})){
        return res.status(409).json({message : "Username or email already exists"})
    }

    if(password.length<8){
        return res.status(400).json({message: "Password must be at least 8 characters long"})
    }

    // username, password and email must not contain spaces
    if(/\s/.test(username) || /\s/.test(email) || /\s/.test(password)){
        return res.status(400).json({message: "Username, email and password must not contain spaces"})
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password,salt);
    try{
        const newUser = await new user({
           username: username,
           email: email,
           password: hashedPassword
        })
        await newUser.save()
        return res.status(201).json({message : "User registerd successfully"})
    }catch(err){
        return res.status(500).json({message: "Internal server error"})
    }
 
}


async function signinUser(req, res) {
    // signin logic here
    const { email, password } = req.body;
    
    if (!email || !password){
        return res.status(400).json({message : "Email and password are required"})
    }

    const existingUser = await user.findOne({email: email});
    if(!existingUser){
        return res.status(404).json({message : "User not found"})
    }

    const isPasswordValid = await bcrypt.compare(password,  existingUser.password);
    if(!isPasswordValid){
        return res.status(401).json({message : "Invalid password"})
    }
    const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.cookie('token', token,{
        httpOnly: true,
        secure: true, // only if you're using HTTPS
        sameSite: 'None',
    });
    return res.status(200).json({message : "User signed in successfully",token: token, user: {username: existingUser.username, email: existingUser.email}});
}



async function getUserProfile(req, res) {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = req.cookies?.token || authHeader.split(' ')[1];
        console.warn("Token from cookie:", req.cookies.token);
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        // Get user data (exclude password)
        const userData = await user.findById(decoded.id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            id: userData._id,
            username: userData.username,
            email: userData.email,
        });

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        console.error("Profile fetch error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export {registerUser, signinUser, getUserProfile};