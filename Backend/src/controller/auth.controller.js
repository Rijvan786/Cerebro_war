import jwt from "jsonwebtoken"
import { Configure } from "../config/config.js"
import userModel from "../models/auth.model.js"
import { ValidateAndFormate } from "../validator/contact.validator.js"
import { Sendmail } from "../services/Email.services.js"
// import { redisClient } from "../config/redis.config.js"  // replace by mongodb 
import bcrypt from "bcryptjs"
import BlackListModel from "../models/Blacklist.model.js"



async function SendToken(res,user,message){
    
  
    try{
        const token =jwt.sign({
            id:user._id,
            email:user.email,
            InstituteName:user.InstituteName,
            role:user.role

        },
    Configure.JWT_SECRET,{
        expiresIn:"7d"  
    }
    )

    res.cookie("token",token)

    res.status(200).json({
        message,
        success:true,
        user:{
            InstituteName:user.InstituteName,
            email:user.email,
            contact:user.contact,
            countryCode:user.countryCode,
            role:user.role

        }
    })
         
       


    }
    catch(error){
        return res.status(401).json({message:"Unauthorized Invalid Token"})
    }
}


export async function RegisterController(req,res){
    const {InstituteName,email,contact,role,password}=req.body
     const validateContact=await ValidateAndFormate(contact)
     console.log(validateContact);
     if(!validateContact){
        return res.status(400).json({
            message:"Invalid Contact number"
        })
     }


    try{
        const UserIsExist=await userModel.findOne({
            $or:[
                {InstituteName},
                {email}
            ]
        }).select("+password")

        if(UserIsExist){
            return res.status(409).json({
                message:`User ${UserIsExist.email===email?"Email is all ready Registered":"is all ready registered"}`
            })
        }
        const user=await userModel.create({
            InstituteName,
            email,
            contact:validateContact,
            countryCode:validateContact.slice(0,3),
            role,
            password
        })
       
        const token=jwt.sign({email:user.email},Configure.JWT_SECRET,{expiresIn:"7d"})
        await Sendmail({
            to: email,
            subject: "⚔️ Welcome to Math-War — Verify Your Account",
            text: `Welcome Operator ${InstituteName}!\n\nYour Math-War combat profile has been created.\nVerify your email to enter the arena:\n\nhttp://localhost:3000/api/auth/verify-email?token=${token}\n\nThis link expires in 7 days.\n\n— Math-War Command`,
            html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Math-War</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Outfit:wght@400;700&display=swap');
    body { margin:0; padding:0; background:#080c14; font-family:'Outfit',sans-serif; color:#f1f5f9; }
    .wrap { max-width:560px; margin:40px auto; background:#0d1117; border:1px solid rgba(139,92,246,0.25); border-radius:20px; overflow:hidden; }
    .header { background:linear-gradient(135deg,#1a0f3c,#0d1117); padding:36px 40px 28px; text-align:center; border-bottom:1px solid rgba(139,92,246,0.2); }
    .logo { font-family:'Share Tech Mono',monospace; font-size:1.6rem; letter-spacing:6px; background:linear-gradient(135deg,#818cf8,#c4b5fd); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .logo-sub { font-family:'Share Tech Mono',monospace; font-size:0.65rem; letter-spacing:0.35em; color:rgba(167,139,250,0.6); margin-top:6px; }
    .body { padding:36px 40px; }
    .greeting { font-size:1rem; color:#94a3b8; font-family:'Share Tech Mono',monospace; margin-bottom:8px; }
    .operator { font-size:1.4rem; font-weight:700; color:#e0e7ff; margin-bottom:24px; }
    .msg { font-size:0.92rem; color:#64748b; line-height:1.7; margin-bottom:28px; }
    .msg span { color:#a5b4fc; }
    .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(139,92,246,0.35),transparent); margin:0 0 28px; }
    .cta-wrap { text-align:center; margin-bottom:28px; }
    .cta { display:inline-block; padding:14px 40px; background:linear-gradient(135deg,#6d28d9,#7c3aed); color:#fff; text-decoration:none; border-radius:9999px; font-family:'Share Tech Mono',monospace; font-size:0.82rem; letter-spacing:0.12em; box-shadow:0 4px 24px rgba(109,40,217,0.55); }
    .info-box { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:18px 22px; margin-bottom:24px; font-family:'Share Tech Mono',monospace; font-size:0.78rem; color:#475569; line-height:1.8; }
    .info-box strong { color:#8b5cf6; }
    .footer { padding:20px 40px; border-top:1px solid rgba(255,255,255,0.05); text-align:center; font-family:'Share Tech Mono',monospace; font-size:0.68rem; color:#334155; letter-spacing:0.1em; }
    .dot { display:inline-block; width:5px; height:5px; border-radius:50%; background:#4ade80; margin-right:6px; vertical-align:middle; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="logo">MATH-WAR</div>
      <div class="logo-sub">COSMIC OPERATOR NETWORK</div>
    </div>
    <div class="body">
      <div class="greeting">INCOMING_TRANSMISSION //</div>
      <div class="operator">Welcome, ${InstituteName} ⚔️</div>
      <p class="msg">Your <span>combat profile</span> has been initialised in the Math-War network. One final step remains before you can enter the arena — verify your email address.</p>
      <div class="divider"></div>
      <div class="cta-wrap">
        <a  href="https://cerebro-war.onrender.com/api/auth/verify-email?token=${token}" class="cta">▶ VERIFY &amp; ENTER ARENA</a>
      </div>
      <div class="info-box">
        <strong>OPERATOR_ID :</strong> ${InstituteName}<br/>
        <strong>COMM_CHANNEL :</strong> ${email}<br/>
        <strong>TOKEN_EXPIRY  :</strong> 7 days from now
      </div>
      <p class="msg" style="font-size:0.8rem;">If you did not create this account, you can safely ignore this transmission.</p>
    </div>
    <div class="footer">
      <span class="dot"></span>SYSTEM_STATUS: ONLINE &nbsp;|&nbsp; Math-War © ${new Date().getFullYear()}
    </div>
  </div>
</body>
</html>`,
        })

        await SendToken(res,user,"Institute is Registered Successfully")
    }
    catch(err){
        return res.status(500).json({
        message:`${err} Internal server error`
        })
    }
}

export async function Emailverificationcontroller(req,res){
    const {token,confirm}=req.query

    try{
            const decoeded=jwt.verify(token,process.env.JWT_SECRET)

             const user=await userModel.findOne({
                email:decoeded.email
             })

             if(!user){
                return  res.status(404).json({
                    message:"user is not found"
                })
             }
             if(user.verified){
                const html=`
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .container { background: white; padding: 40px; border-radius: 10px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-width: 500px; }
        h1 { color: #28a745; margin-bottom: 20px; }
        p { color: #555; line-height: 1.6; margin: 15px 0; }
        .button { display: inline-block; margin: 10px 5px; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; transition: all 0.3s; }
        .login-btn { background-color: #007bff; color: white; }
        .login-btn:hover { background-color: #0056b3; }
        .dashboard-btn { background-color: #28a745; color: white; }
        .dashboard-btn:hover { background-color: #1e7e34; }
        .info { background: #e7f3ff; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0; text-align: left; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✓ Already Verified</h1>
        <p>Good news! Your email is already verified.</p>
        <div class="info">
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Status:</strong> <span style="color: #28a745;">Verified</span></p>
        </div>
        <p>You can now log in to your account and start using our services.</p>
        <div>
          <a href="https://cerebro-war.onrender.com/login" class="button login-btn">Go to Login</a>
          
        </div>
        <p style="margin-top: 30px; color: #999; font-size: 12px;">Thank you for being a part of our community!</p>
      </div>
    </body>
    </html>
    `

               return  res.send(html)
             }

             if(confirm == "true"){
                 user.verified=true
                 user.save()

               const html=`
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .container { background: white; padding: 40px; border-radius: 10px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-width: 500px; }
        h1 { color: #28a745; margin-bottom: 20px; }
        p { color: #555; line-height: 1.6; margin: 15px 0; }
        .button { display: inline-block; margin: 10px 5px; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; transition: all 0.3s; }
        .button:hover { background-color: #0056b3; }
        .success-icon { font-size: 50px; margin-bottom: 20px; animation: bounce 0.6s; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="success-icon">✓</div>
        <h1>Email Verified Successfully!</h1>
        <p>Congratulations! Your email has been successfully verified.</p>
        <p>You can now log in to your account and start using our services.</p>
        <a href="https://cerebro-war.onrender.com/login" class="button">Go to Login</a>
        <p style="margin-top: 30px; color: #999; font-size: 12px;">Thank you for being a part of our community!</p>
      </div>
    </body>
    </html>
    `
                 return res.send(html)
                
             }
            const html=`
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      .container { background: white; padding: 40px; border-radius: 10px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-width: 500px; }
      h1 { color: #667eea; margin-bottom: 20px; }
      p { color: #555; line-height: 1.6; margin: 15px 0; }
      .info-box { background: #f0f4ff; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; text-align: left; border-radius: 5px; }
      .verify-btn { display: inline-block; margin-top: 20px; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; transition: all 0.3s; cursor: pointer; border: none; }
      .verify-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
      .steps { text-align: left; margin: 20px 0; }
      .step { margin: 10px 0; padding: 10px; background: #f9f9f9; border-radius: 5px; }
      .step-number { display: inline-block; width: 30px; height: 30px; background: #667eea; color: white; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 10px; font-weight: bold; }
      .email-display { font-weight: bold; color: #667eea; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🔐 Verify Your Email</h1>
      <p>Let's verify your email address to complete your registration.</p>
      
      <div class="info-box">
        <p><strong>Email to verify:</strong></p>
        <p class="email-display">${user.email}</p>
      </div>
      
      <div class="steps">
        <div class="step">
          <span class="step-number">1</span> Click the button below to verify your email
        </div>
        <div class="step">
          <span class="step-number">2</span> Your account will be activated immediately
        </div>
        <div class="step">
          <span class="step-number">3</span> You can then log in with your credentials
        </div>
      </div>
      
      <a href="https://cerebro-war.onrender.com/api/auth/verify-email?token=${token}&confirm=true" class="verify-btn">✓ Verify Email Now</a>
      
      <p style="margin-top: 30px; color: #999; font-size: 12px;">If you did not sign up for this account, please ignore this email.</p>
    </div>
  </body>
  </html>
  `
            return res.send(html)


    }
    catch(err){
        console.log("not verify email");
         const html=`
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .container { background: white; padding: 40px; border-radius: 10px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-width: 500px; }
        h1 { color: #dc3545; margin-bottom: 20px; }
        p { color: #555; line-height: 1.6; margin: 15px 0; }
        .error-box { background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; padding: 15px; margin: 20px 0; }
        .button { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .button:hover { background-color: #0056b3; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✗ Verification Failed</h1>
        <div class="error-box">
          <p><strong>Error:</strong> ${err.message}</p>
          <p>The verification link is invalid or has expired.</p>
        </div>
        <p>Please request a new verification email from your account.</p>
        <a href="https://cerebro-war.onrender.com/api/auth/resendmail-verification" class="button">Request New Link</a>
        <p style="margin-top: 30px; color: #999; font-size: 12px;">If you need help, please contact our support team.</p>
      </div>
    </body>
    </html>
    `
    res.send(html)
    }

}

export async function Resendmailcontroller(req,res){
  const {email}=req.body

  try{
    const user=await userModel.findOne({
      email:email
    })
if(!user){
        return res.status(404).json({
          message:"user is not found"
        })
      }
  
 if (user.lastVerificationEmailSent) {
      const timeSinceLastEmail = Date.now() - user.lastVerificationEmailSent.getTime();
      const oneMinute = 60 * 1000;

      if (timeSinceLastEmail < oneMinute) {
        return res.status(429).json({
          success: false,
          message: "Please wait before requesting another verification email. Try again in a minute.",
          retryAfter: Math.ceil((oneMinute - timeSinceLastEmail) / 1000),
        });
      }
    }

    // Check if resend limit exceeded (5 times per 24 hours)
    if (user.lastVerificationEmailSent) {
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const timeSinceFirstEmail = Date.now() - user.lastVerificationEmailSent.getTime();

      if (timeSinceFirstEmail < twentyFourHours && user.verificationEmailResendCount >= 5) {
        return res.status(429).json({
          success: false,
          message: "You have exceeded the maximum number of verification email requests. Please try again in 24 hours.",
        });
      }
    }


    // Generate new verification token
    const emailVerificationToken = jwt.sign(
      {  id:user._id,
         InstituteName:user.InstituteName,
         email: user.email,

       },
      process.env.JWT_SECRET
    );

    // Update user with new resend timestamp and increment counter
      user.lastVerificationEmailSent = new Date();
      user.verificationEmailResendCount += 1;
      await user.save();

    // Send verification email
    await Sendmail({
      to: email,
      subject: "⚔️ Math-War — New Verification Link",
      text: `Operator ${user.InstituteName},\n\nA new verification link has been issued for your Math-War account.\n\nVerify here: https://cerebro-war.onrender.com/api/auth/verify-email?token=${emailVerificationToken}\n\nThis link expires in 24 hours.\n\nIf you did not request this, ignore this transmission.\n\n— Math-War Command`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Math-War — Resend Verification</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Outfit:wght@400;700&display=swap');
    body { margin:0; padding:0; background:#080c14; font-family:'Outfit',sans-serif; color:#f1f5f9; }
    .wrap { max-width:560px; margin:40px auto; background:#0d1117; border:1px solid rgba(139,92,246,0.25); border-radius:20px; overflow:hidden; }
    .header { background:linear-gradient(135deg,#1a0f3c,#0d1117); padding:36px 40px 28px; text-align:center; border-bottom:1px solid rgba(139,92,246,0.2); }
    .logo { font-family:'Share Tech Mono',monospace; font-size:1.6rem; letter-spacing:6px; background:linear-gradient(135deg,#818cf8,#c4b5fd); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .logo-sub { font-family:'Share Tech Mono',monospace; font-size:0.65rem; letter-spacing:0.35em; color:rgba(167,139,250,0.6); margin-top:6px; }
    .body { padding:36px 40px; }
    .greeting { font-size:1rem; color:#94a3b8; font-family:'Share Tech Mono',monospace; margin-bottom:8px; }
    .operator { font-size:1.4rem; font-weight:700; color:#e0e7ff; margin-bottom:24px; }
    .msg { font-size:0.92rem; color:#64748b; line-height:1.7; margin-bottom:28px; }
    .msg span { color:#a5b4fc; }
    .badge { display:inline-block; background:rgba(251,191,36,0.1); border:1px solid rgba(251,191,36,0.3); border-radius:8px; padding:10px 18px; font-family:'Share Tech Mono',monospace; font-size:0.78rem; color:#fbbf24; margin-bottom:28px; }
    .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(139,92,246,0.35),transparent); margin:0 0 28px; }
    .cta-wrap { text-align:center; margin-bottom:28px; }
    .cta { display:inline-block; padding:14px 40px; background:linear-gradient(135deg,#6d28d9,#7c3aed); color:#fff; text-decoration:none; border-radius:9999px; font-family:'Share Tech Mono',monospace; font-size:0.82rem; letter-spacing:0.12em; box-shadow:0 4px 24px rgba(109,40,217,0.55); }
    .footer { padding:20px 40px; border-top:1px solid rgba(255,255,255,0.05); text-align:center; font-family:'Share Tech Mono',monospace; font-size:0.68rem; color:#334155; }
    .dot { display:inline-block; width:5px; height:5px; border-radius:50%; background:#fbbf24; margin-right:6px; vertical-align:middle; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="logo">MATH-WAR</div>
      <div class="logo-sub">VERIFICATION RE-ISSUE</div>
    </div>
    <div class="body">
      <div class="greeting">RE-TRANSMISSION //</div>
      <div class="operator">Operator ${user.InstituteName}</div>
      <div class="badge">⚠ NEW VERIFICATION LINK ISSUED</div>
      <p class="msg">You requested a new verification link for your <span>Math-War</span> combat profile. Click below to confirm your identity and unlock arena access.</p>
      <div class="divider"></div>
      <div class="cta-wrap">
        <a href="https://cerebro-war.onrender.com/api/auth/verify-email?token=${emailVerificationToken}" class="cta">▶ VERIFY IDENTITY NOW</a>
      </div>
      <p class="msg" style="font-size:0.8rem;">This link expires in <strong style="color:#f1f5f9;">24 hours</strong>. If you did not request this, ignore this message — your account remains secure.</p>
    </div>
    <div class="footer">
      <span class="dot"></span>SYSTEM_STATUS: ONLINE &nbsp;|&nbsp; Math-War © ${new Date().getFullYear()}
    </div>
  </div>
</body>
</html>`,
    });
res.status(200).json({
        message:"Resend Email successfully"
      })
  }
  catch(err){

  }

}

export async function LoginController(req,res){
   const {InstituteName,email,password}=req.body
   console.log(InstituteName,password);
          const user=await userModel.findOne(
            {$or:[{InstituteName:InstituteName}
              ,{email:email}
              
            ]}).select("+password")
;
          if(!user){
            return res.status(404).json({
              message:"User is not found"
            })
          }     if(!user.verified){
          return res.status(400).json({
            message:"user is not verified"
          })
        }

          const ispasswordmatched=await user.comparePassword(password)
          if(!ispasswordmatched){
            return res.status(400).json({
              message:"User is Unauthorized"
            })
          }
          const token=jwt.sign({
            id:user._id,
            InstituteName:user.InstituteName,
            email:user.email
          },
          process.env.JWT_SECRET
        )
        res.cookie("token",token)
   

          SendToken(res,user,"User is login successfully")
}

export async function Sendforgetmailcontroller (req,res){
        const {email}=req.body

        const user=await userModel.findOne({
            email:email
          })

       if(!user){
       return  res.status(200).json({
          message:"User is not found",
          err:"Bad Request"
        })
       }

     await Sendmail({
    to: user.email,
    subject: "🔐 Math-War — Reset Your Access Code",
    text: `Operator ${user.InstituteName},\n\nA password reset has been requested for your Math-War combat profile.\n\nClick the link to reset your access code:\nhttps://cerebro-war.onrender.com/forgetPassword\n\nIf you did not request this, your account is still secure — ignore this message.\n\n— Math-War Command`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Math-War — Reset Access Code</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Outfit:wght@400;700&display=swap');
    body { margin:0; padding:0; background:#080c14; font-family:'Outfit',sans-serif; color:#f1f5f9; }
    .wrap { max-width:560px; margin:40px auto; background:#0d1117; border:1px solid rgba(248,113,113,0.25); border-radius:20px; overflow:hidden; }
    .header { background:linear-gradient(135deg,#2d0a0a,#0d1117); padding:36px 40px 28px; text-align:center; border-bottom:1px solid rgba(248,113,113,0.2); }
    .logo { font-family:'Share Tech Mono',monospace; font-size:1.6rem; letter-spacing:6px; background:linear-gradient(135deg,#fca5a5,#f87171); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .logo-sub { font-family:'Share Tech Mono',monospace; font-size:0.65rem; letter-spacing:0.35em; color:rgba(248,113,113,0.6); margin-top:6px; }
    .body { padding:36px 40px; }
    .greeting { font-size:1rem; color:#94a3b8; font-family:'Share Tech Mono',monospace; margin-bottom:8px; }
    .operator { font-size:1.4rem; font-weight:700; color:#e0e7ff; margin-bottom:24px; }
    .msg { font-size:0.92rem; color:#64748b; line-height:1.7; margin-bottom:28px; }
    .msg span { color:#fca5a5; }
    .badge { display:inline-block; background:rgba(248,113,113,0.1); border:1px solid rgba(248,113,113,0.3); border-radius:8px; padding:10px 18px; font-family:'Share Tech Mono',monospace; font-size:0.78rem; color:#f87171; margin-bottom:28px; }
    .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(248,113,113,0.35),transparent); margin:0 0 28px; }
    .cta-wrap { text-align:center; margin-bottom:28px; }
    .cta { display:inline-block; padding:14px 40px; background:linear-gradient(135deg,#991b1b,#f87171); color:#fff; text-decoration:none; border-radius:9999px; font-family:'Share Tech Mono',monospace; font-size:0.82rem; letter-spacing:0.12em; box-shadow:0 4px 24px rgba(248,113,113,0.4); }
    .secure-box { background:rgba(74,222,128,0.05); border:1px solid rgba(74,222,128,0.15); border-radius:10px; padding:14px 18px; font-family:'Share Tech Mono',monospace; font-size:0.76rem; color:#4ade80; margin-bottom:20px; }
    .footer { padding:20px 40px; border-top:1px solid rgba(255,255,255,0.05); text-align:center; font-family:'Share Tech Mono',monospace; font-size:0.68rem; color:#334155; }
    .dot { display:inline-block; width:5px; height:5px; border-radius:50%; background:#f87171; margin-right:6px; vertical-align:middle; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="logo">MATH-WAR</div>
      <div class="logo-sub">ACCESS CODE RESET</div>
    </div>
    <div class="body">
      <div class="greeting">SECURITY_ALERT //</div>
      <div class="operator">Operator ${user.InstituteName} 🔐</div>
      <div class="badge">⚠ PASSWORD RESET REQUESTED</div>
      <p class="msg">A request was made to reset the <span>access code</span> for your Math-War combat profile. Click below to set a new password.</p>
      <div class="divider"></div>
      <div class="cta-wrap">
        <a href="https://cerebro-war.onrender.com/forgetPassword" class="cta">▶ RESET ACCESS CODE</a>
      </div>
      <div class="secure-box">✓ If you did not request this reset, your account is safe. No changes have been made.</div>
    </div>
    <div class="footer">
      <span class="dot"></span>SYSTEM_STATUS: ONLINE &nbsp;|&nbsp; Math-War © ${new Date().getFullYear()}
    </div>
  </div>
</body>
</html>`
  })

    await SendToken(res,user,"Forget password email sent successfully")

  
          
}

export async function ForgetPasswordcontroller(req,res){
  const {email,newpassword}=req.body

        const user=await userModel.findOne({
            email:email
          }).select("+password")

       if(!user){
       return  res.status(200).json({
          message:"User is not found",
          err:"Bad Request"
        })
       }
       const setpassword=await userModel.findByIdAndUpdate({_id:user._id}
        ,{password:await bcrypt.hash(newpassword,10)})

    await SendToken(res,user,"Password is reset successfully")
}

export async function  Logoutcontroller(req,res){
       const token=req.cookies.token
       res.clearCookie("token")
       BlackListModel.create({token:token})
       res.status(200).json({
        message:"User is logout successfully"
       })
}

export async function Getmecontroller(req,res){
    try {
        const userid=req.user.id
        
      const user=await userModel.findOne({
        _id:userid
      })
   console.log(user);

      res.status(200).json({
        message:"User is fetch successfully",
        user:{
          InstituteName: user.InstituteName,
          email:user.email,
        }
        
      })
    } catch (error) {
      res.status(500).json({
        message:"Internal Server Error"
      })
    }
}

export async function GoogleCallback(req, res) {
  try {
    const { id, displayName, emails, photos } = req.user        
    const email    = emails[0].value
    const photo    = photos?.[0]?.value || null

    let user = await userModel.findOne({ email })
    const isNewUser = !user

    if (isNewUser) {
      user = await userModel.create({
        googleId: id,
        InstituteName: displayName,
        email,
        photo,
        verified:true,   // Google accounts are pre-verified
      })

      // Send welcome email to brand-new Google sign-ups
      await Sendmail({
        to: email,
        subject: "⚔️ Welcome to Math-War — Arena Access Granted",
        text: `Welcome Operator ${displayName}!\n\nYour Math-War combat profile has been created via Google.\nYou can now access the arena at:\nhttps://cerebro-war.onrender.com/\n\nPrepare for battle!\n\n— Math-War Command`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Welcome to Math-War</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Outfit:wght@400;700&display=swap');
    body { margin:0; padding:0; background:#080c14; font-family:'Outfit',sans-serif; color:#f1f5f9; }
    .wrap { max-width:560px; margin:40px auto; background:#0d1117; border:1px solid rgba(34,211,238,0.25); border-radius:20px; overflow:hidden; }
    .header { background:linear-gradient(135deg,#062030,#0d1117); padding:36px 40px 28px; text-align:center; border-bottom:1px solid rgba(34,211,238,0.2); }
    .logo { font-family:'Share Tech Mono',monospace; font-size:1.6rem; letter-spacing:6px; background:linear-gradient(135deg,#67e8f9,#22d3ee); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .logo-sub { font-family:'Share Tech Mono',monospace; font-size:0.65rem; letter-spacing:0.35em; color:rgba(34,211,238,0.6); margin-top:6px; }
    .body { padding:36px 40px; }
    .greeting { font-size:1rem; color:#94a3b8; font-family:'Share Tech Mono',monospace; margin-bottom:8px; }
    .operator { font-size:1.4rem; font-weight:700; color:#e0e7ff; margin-bottom:16px; }
    .badge { display:inline-block; background:rgba(34,211,238,0.1); border:1px solid rgba(34,211,238,0.3); border-radius:8px; padding:8px 16px; font-family:'Share Tech Mono',monospace; font-size:0.75rem; color:#22d3ee; margin-bottom:24px; }
    .msg { font-size:0.92rem; color:#64748b; line-height:1.7; margin-bottom:28px; }
    .msg span { color:#67e8f9; }
    .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(34,211,238,0.35),transparent); margin:0 0 28px; }
    .cta-wrap { text-align:center; margin-bottom:28px; }
    .cta { display:inline-block; padding:14px 40px; background:linear-gradient(135deg,#0891b2,#22d3ee); color:#fff; text-decoration:none; border-radius:9999px; font-family:'Share Tech Mono',monospace; font-size:0.82rem; letter-spacing:0.12em; box-shadow:0 4px 24px rgba(34,211,238,0.4); }
    .info-row { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:10px; padding:16px 20px; font-family:'Share Tech Mono',monospace; font-size:0.78rem; color:#475569; line-height:1.8; margin-bottom:20px; }
    .info-row strong { color:#22d3ee; }
    .footer { padding:20px 40px; border-top:1px solid rgba(255,255,255,0.05); text-align:center; font-family:'Share Tech Mono',monospace; font-size:0.68rem; color:#334155; }
    .dot { display:inline-block; width:5px; height:5px; border-radius:50%; background:#22d3ee; margin-right:6px; vertical-align:middle; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="logo">MATH-WAR</div>
      <div class="logo-sub">GOOGLE OPERATOR LINK</div>
    </div>
    <div class="body">
      <div class="greeting">TRANSMISSION_RECEIVED //</div>
      <div class="operator">Welcome, ${displayName} ⚔️</div>
      <div class="badge">✓ GOOGLE IDENTITY VERIFIED</div>
      <p class="msg">Your <span>Math-War combat profile</span> has been created via Google OAuth. Arena access has been granted — no further verification required.</p>
      <div class="divider"></div>
      <div class="cta-wrap">
        <a href="https://cerebro-war.onrender.com/" class="cta">▶ ENTER THE ARENA</a>
      </div>
      <div class="info-row">
        <strong>OPERATOR_ID :</strong> ${displayName}<br/>
        <strong>COMM_CHANNEL :</strong> ${email}<br/>
        <strong>AUTH_METHOD  :</strong> Google OAuth 2.0
      </div>
    </div>
    <div class="footer">
      <span class="dot"></span>SYSTEM_STATUS: ONLINE &nbsp;|&nbsp; Math-War © ${new Date().getFullYear()}
    </div>
  </div>
</body>
</html>`,
      })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, InstituteName:displayName, role: user.role },
      Configure.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure:   Configure.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.redirect( "https://cerebro-war.onrender.com")
  } catch (err) {
    console.error("GoogleCallback error:", err)
    res.redirect("https://cerebro-war.onrender.com/register?error=google_failed")
  }
}