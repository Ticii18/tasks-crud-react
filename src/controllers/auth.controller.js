import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        })
        const userSaver = await newUser.save();
        const token = await createAccessToken({id: userSaver._id})

        res.cookie("token", token)
        res.json({
            id: userSaver.id,
            username: userSaver.username,
            email: userSaver.email,
            createdAt: userSaver.createdAt,
            updateAt: userSaver.updatedAt
        })


    } catch (error) {
        res.status(500).json({mesagge:error.mesagge})
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound= await User.findOne({email})

        if (!userFound) return res.status(404).json({mesagge:"user not found"});


        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch) return res.status(404).json({mesagge:"Incorrect password"})

        const token = await createAccessToken({id: userFound._id})

        res.cookie("token", token)
        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        })


    } catch (error) {
        res.status(500).json({mesagge:error.mesagge})
    }
}

export const logout = (req, res) => {
    res.cookie('token',"",
        {
            expires: new Date(0)
        })
    return res.sendStatus(200)
}

export const profile = (req, res) => {
    res.send('profile')
}