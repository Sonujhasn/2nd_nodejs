import express from "express";
import {config} from "dotenv"
import userRouter from "./routes/user.js" 

export const app=express()

config({
    path:"./data/config.env"
})

app.use("/users",userRouter)
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("nice working");
})


