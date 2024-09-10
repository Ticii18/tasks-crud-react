import axios from 'axios'

const API = 'http://localhost:3000/api'


export const registerRequest = (User)=> axios.post(`${API}/register`, User)

export const loginRequest = (user) => axios.post(`${API}/login`, user, { withCredentials: true });
