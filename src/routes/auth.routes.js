import { Router } from "express";
import { login, logout, register, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
const userRoutes = Router()

userRoutes.post('/register', validateSchema(registerSchema), register)
userRoutes.post('/login', validateSchema(loginSchema), login)
userRoutes.post('/logout', logout)
userRoutes.get('/profile', authRequired, profile)

export default userRoutes