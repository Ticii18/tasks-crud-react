import axios from './axios';



export const registerRequest = (User)=> axios.post(`/register`, User)

export const loginRequest = (user) => axios.post(`/login`, user, { withCredentials: true });


export const verifyTokenRequest = ()=> axios.get('/verify')
