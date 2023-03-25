import { USer } from "../models/user.js"

export const getAllUsers=async(req,res)=>{
    
    console.log(req.query)

   const users=await USer.find({})
    res.json({
        success:true,
        users
    })
}

export const register=async(req,res)=>{
    
    const {name,email,password}=req.body

    await USer.create({
        name,
        email,
        password
    })
     res.status(201).json({
         success:true,
         message:"registered user"
     })
 }

 export const specialfunc=(req,res)=>{
    res.json({
        success:true,
        message:"just joking"
    })
}

export const getuserbyId=async(req,res)=>{
    // const id=req.query.id;
    const {id}=req.params;
    const users= await USer.findById(id)

     res.json({
          success:true,
          users
     })
} 