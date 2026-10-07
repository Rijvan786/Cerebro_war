import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import AuthRouter from "./routes/auth.route.js"
import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import { Configure } from "./config/config.js"
import path from  "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);







const app=express()
app.use(express.json())
app.use(express.urlencoded( { extended: true }))
app.use(cookieParser())
app.use(express.static('./public'))

// router

app.use(cors({
                origin:"http://localhost:5173",
                credentials:true
        }))

// Use routes
app.use("/api/auth",AuthRouter)
// app.use("/api/Questions",QuestionGenerateRouter)

// Google Auth
app.use(passport.initialize())
passport.use(new GoogleStrategy({
        clientID:Configure.GOOGLE2_CLIENT_ID,
        clientSecret:Configure.GOOGLE2_CLIENT_SECRET,
        callbackURL:"/api/auth/google/callback"
},(_,__,profile,done)=>{
        return done(null,profile)
}))

app.use("*name",(req,res)=>{
  res.sendFile(path.join(__dirname,".","../public/index.html"))
})


export default app
