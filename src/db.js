import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost/merndb');
        console.log(">>> se conecto correcatamente");
    } catch (error) {
        console.log(error);
    }
}