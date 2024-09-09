import { Router } from "express";
import { login, logout, register, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const userRoutes = Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.post('/logout', logout)
userRoutes.get('/profile', authRequired, profile)

export default userRoutes