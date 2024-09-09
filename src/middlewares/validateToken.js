import jwt from "jsonwebtoken"
import { tokenSecret } from "../config.js"
export const authRequired= (req,res,next) => {
    const {token} = req.cookies
    if(!token) return res.status(401).json({message:'No token, authorization denied'})

    jwt.verify(token, tokenSecret,(err,user)=>{
        if(err) return res.status(403).json({message:'Token invalido, authorization denied'})
        
        req.user=user
        next()
    })
}