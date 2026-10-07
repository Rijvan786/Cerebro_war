import { Router } from "express";
import { Emailverificationcontroller, ForgetPasswordcontroller, Getmecontroller, GoogleCallback, Logincontroller, Logoutcontroller, RegisterController, Resendmailcontroller, Sendforgetmailcontroller } from "../controller/auth.controller.js";
import { RegisterValidator } from "../validator/auth.validator.js";
import { Identifire } from "../middlewares/auth.middleware.js";
import passport from "passport";
import { Configure } from "../config/config.js";
import app from "../App.js";

const router=Router()


router.post("/register",RegisterValidator,RegisterController)


router.post("/login",Logincontroller)

router.get("/verify-email",Emailverificationcontroller)

router.post("/resendmail-verification",Resendmailcontroller)

router.post("/sendforgetmail",Sendforgetmailcontroller)

router.post("/forgetpassword",ForgetPasswordcontroller),

router.get("/logout",Identifire,Logoutcontroller)



router.get("/google",passport.authenticate("google",{scope:["profile","email"]}))

router.get("/google/callback",
    passport.authenticate("google",{session:false,failureRedirect:Configure.NODE_ENV==="development"?"http://localhost:5173/register":"/"}),
GoogleCallback)

router.get("/getme",Identifire,Getmecontroller) 
export default router