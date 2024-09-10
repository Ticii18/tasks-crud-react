import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'
import { tokenSecret } from "../config.js";

export const register = async (req, res) => {
    const { email, password, username } = req.body;
    try {

        const userFound= await User.findOne({email})
        if (userFound) return res.status(400).json(["The email address is already"])
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        })
        const userSaver = await newUser.save();
        const token = await createAccessToken({id: userSaver.id})

        res.cookie("token", token,{
            sameSite:'none',
            secure:true,
            httpOnly:false,
        })
        res.json({
            id: userSaver._id,
            username: userSaver.username,
            email: userSaver.email,
            createdAt: userSaver.createdAt,
            updateAt: userSaver.updatedAt
        })


    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound= await User.findOne({email})

        if (!userFound) return res.status(404).json({message:"user not found"});


        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch) return res.status(400).json({message:"Incorrect password"})

        const token = await createAccessToken({id: userFound._id})

        res.cookie("token", token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        })


    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const logout = (req, res) => {
    res.cookie('token',"",
        {
            expires: new Date(0)
        })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({message:'user not found'})

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt
    })

    res.send('profile')
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message:'No token, authorization denied'})
    
    
    jwt.verify(token, tokenSecret, async (err, user)=>{
        if(err) return res.status(401),json({message:"Unauthorized"})
        
        const userFound = await User.findById(user.id)

        if(!userFound) return res.status(401).json({message:'Unauthorized'})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    })



}