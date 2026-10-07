import jwt from "jsonwebtoken"
// import { redisClient } from "../config/redis.config.js"  // Replace by mongodb collection 
import { ca } from "zod/v4/locales"
import { Configure } from "../config/config.js"
import BlackListModel from "../models/Blacklist.model.js"



export async function Identifire(req,res,next){
    const token=req.cookies.token
    console.log(token,"token");
    if(!token){
        return res.status(404).json({
            message:"User is not provided Token "
        })
    }

    const Blacklisted=await BlackListModel.findOne({token:token})
    if(Blacklisted){
        return res.status(401).json({
            message:"Token is blacklisted"
        })
    }
    try{
        const decoded=jwt.verify(token,Configure.JWT_SECRET)
        req.user=decoded

        next()

    }
    catch(err){
        return res.status(401).json({
            message:"Invalid Token" 
        })
    }
}