import { USer } from "../models/user.js"
import bcrypt from "bcrypt"

import { sendCookie } from "../utils/features.js"
import ErroeHandler from "../middlewares/error.js"

export const getAllUsers=async(req,res)=>{}

export const login =async(req,res,next)=>{

    try {
        
        const {email,password}=req.body

        const user=await USer.findOne({email}).select("+password")

        if(!user) return next(new ErroeHandler("Invalid Email or password",400))
        //if(!user) return res.status(404).json({
        //    success:false,
        //    message:"Invalid Email or password"
    // })
        
        const isMatch=await bcrypt.compare(password,user.password);
        
        if(!isMatch) return res.status(404).json({
            success:false,
            message:"Invalid Email or password"
        })
        sendCookie(user,res,`welcome back ${user.name}`,200)
    } catch (error) {
        next(error)
    }
}

export const register=async(req,res,next)=>{
   try {
    const {name,email,password}=req.body;

    let user=await USer.findOne({email})
 
   // if(user) return res.status(404).json({
    //  success:false,
   //   message:"User already exist"
   // })
    if(user) return next(new ErroeHandler("User already exist",400))
 
     const hashpassword=await bcrypt.hash(password,10)
 
     user= await USer.create({name,email,password:hashpassword})
      
     sendCookie(user,res,"Registered Successfully",201)
   } catch (error) {
      next(error)
   }
     
}

 

export const getMyprofile=(req,res)=>{
    //const id="myid"

    
    res.status(200).json({
        success:true,
        user:req.user
    })
}

export const logout =(req,res)=>{

    res.status(200)
    .cookie("token","",{expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development" ?"lax":"none",
        secure:process.env.NODE_ENV==="Development" ? false:true
    })
    .json({
        success:true,
        user:req.user
    })
}