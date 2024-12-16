import express from "express";
import cors from 'cors';
import authRoute from './src/routes/authRoute.js'
import messageRoute from './src/routes/messageRoutes.js'
import { connectDb } from "./src/config/db.js";
import cookieParser from "cookie-parser";
const app= express()
import dotenv from "dotenv";
dotenv.config();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(cors({
    origin:"http://localhost:5173/",
    credentials:true
}))

app.use('/api/auth',authRoute)
app.use('/api/message',messageRoute)



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log( `server running @ port:${PORT}`)
})
