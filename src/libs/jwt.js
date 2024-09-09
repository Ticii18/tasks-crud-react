import { tokenSecret } from "../config.js"
import jwt from "jsonwebtoken"

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            tokenSecret,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            }
        )
    }
    )
}