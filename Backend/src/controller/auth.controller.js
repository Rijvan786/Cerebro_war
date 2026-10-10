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
        <a  href="https://cerebrowar-production.up.railway.app/api/auth/verify-email?token=${token}" class="cta">▶ VERIFY &amp; ENTER ARENA</a>
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
                const html=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Already Verified | Math-War</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #090d16;
      background-image: 
        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.18) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.15) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.5) 0px, transparent 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px 16px;
      color: #f8fafc;
    }
    .card {
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      padding: 40px 32px;
      width: 100%;
      max-width: 480px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.15);
      text-align: center;
    }
    .icon-wrapper {
      width: 72px;
      height: 72px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px auto;
      box-shadow: 0 0 25px rgba(16, 185, 129, 0.25);
    }
    .icon-wrapper svg { width: 36px; height: 36px; color: #10b981; }
    h1 { font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 8px; }
    .subtitle { color: #94a3b8; font-size: 15px; line-height: 1.5; margin-bottom: 24px; }
    .info-card {
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 24px;
      text-align: left;
    }
    .info-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px; }
    .info-value { font-size: 15px; font-weight: 600; color: #38bdf8; word-break: break-all; }
    .badge { display: inline-block; padding: 4px 10px; background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 12px; font-weight: 600; border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.3); margin-top: 6px; }
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 15px 24px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none;
      border-radius: 12px; font-weight: 600; font-size: 15px; transition: all 0.25s ease;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); border: none; cursor: pointer;
    }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6); }
    .footer-note { margin-top: 24px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-wrapper">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
      </svg>
    </div>
    <h1>Already Verified</h1>
    <p class="subtitle">Good news! Your email address is already verified and your account is ready for action.</p>
    <div class="info-card">
      <div class="info-label">Verified Email</div>
      <div class="info-value">${user.email}</div>
      <span class="badge">✓ Verified Active</span>
    </div>
    <a href="https://cerebrowar-production.up.railway.app/login" class="btn">
      Go to Login
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
    </a>
    <p class="footer-note">Thank you for being part of the Math-War community!</p>
  </div>
</body>
</html>`

               return res.send(html)
             }

             if(confirm == "true"){
                 user.verified=true
                 user.save()

               const html=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Successful | Math-War</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #090d16;
      background-image: 
        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.18) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.15) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.5) 0px, transparent 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px 16px;
      color: #f8fafc;
    }
    .card {
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      padding: 40px 32px;
      width: 100%;
      max-width: 480px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(16, 185, 129, 0.2);
      text-align: center;
    }
    .icon-wrapper {
      width: 72px;
      height: 72px;
      background: rgba(16, 185, 129, 0.2);
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px auto;
      box-shadow: 0 0 30px rgba(16, 185, 129, 0.35);
      animation: pulse 2s infinite ease-in-out;
    }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    .icon-wrapper svg { width: 38px; height: 38px; color: #34d399; }
    h1 { font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 8px; }
    .subtitle { color: #94a3b8; font-size: 15px; line-height: 1.5; margin-bottom: 28px; }
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 16px 24px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none;
      border-radius: 12px; font-weight: 600; font-size: 16px; transition: all 0.25s ease;
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4); border: none; cursor: pointer;
    }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(16, 185, 129, 0.6); }
    .footer-note { margin-top: 24px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-wrapper">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
      </svg>
    </div>
    <h1>Email Verified Successfully!</h1>
    <p class="subtitle">Congratulations! Your email account has been verified. You can now log in and access all features.</p>
    <a href="https://cerebrowar-production.up.railway.app/login" class="btn">
      Go to Login
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
    </a>
    <p class="footer-note">Welcome to Math-War!</p>
  </div>
</body>
</html>`
                 return res.send(html)
                
             }
            const html=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email | Math-War</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #090d16;
      background-image: 
        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.18) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.15) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.5) 0px, transparent 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px 16px;
      color: #f8fafc;
    }
    .card {
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      padding: 40px 32px;
      width: 100%;
      max-width: 480px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.15);
      text-align: center;
    }
    .icon-wrapper {
      width: 72px;
      height: 72px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
      border: 1px solid rgba(129, 140, 248, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px auto;
      box-shadow: 0 0 25px rgba(99, 102, 241, 0.3);
    }
    .icon-wrapper svg {
      width: 34px;
      height: 34px;
      color: #818cf8;
    }
    h1 {
      font-size: 25px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.025em;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #94a3b8;
      font-size: 14.5px;
      line-height: 1.5;
      margin-bottom: 24px;
    }
    .email-card {
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 24px;
      text-align: left;
    }
    .email-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .email-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
    }
    .status-badge {
      font-size: 11px;
      font-weight: 600;
      color: #fbbf24;
      background: rgba(251, 191, 36, 0.12);
      border: 1px solid rgba(251, 191, 36, 0.25);
      padding: 2px 8px;
      border-radius: 12px;
    }
    .email-value {
      font-size: 15px;
      font-weight: 600;
      color: #38bdf8;
      word-break: break-all;
    }
    .steps {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 28px;
      text-align: left;
    }
    .step-item {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(30, 41, 59, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 12px 16px;
      border-radius: 12px;
    }
    .step-num {
      width: 28px;
      height: 28px;
      min-width: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
    }
    .step-text {
      font-size: 13.5px;
      color: #cbd5e1;
      font-weight: 500;
    }
    .verify-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 16px 24px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff;
      text-decoration: none;
      border-radius: 14px;
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 0.01em;
      transition: all 0.25s ease;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
      border: none;
      cursor: pointer;
    }
    .verify-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    }
    .verify-btn:active {
      transform: translateY(0);
    }
    .footer-note {
      margin-top: 24px;
      color: #64748b;
      font-size: 12.5px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-wrapper">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
      </svg>
    </div>
    
    <h1>Verify Your Email</h1>
    <p class="subtitle">Confirm your email address to complete registration and activate your Math-War account.</p>
    
    <div class="email-card">
      <div class="email-header">
        <span class="email-label">Email to verify</span>
        <span class="status-badge">Pending</span>
      </div>
      <div class="email-value">${user.email}</div>
    </div>
    
    <div class="steps">
      <div class="step-item">
        <div class="step-num">1</div>
        <div class="step-text">Click the verification button below</div>
      </div>
      <div class="step-item">
        <div class="step-num">2</div>
        <div class="step-text">Instant account activation</div>
      </div>
      <div class="step-item">
        <div class="step-num">3</div>
        <div class="step-text">Log in with your registered credentials</div>
      </div>
    </div>
    
    <a href="https://cerebrowar-production.up.railway.app/api/auth/verify-email?token=${token}&confirm=true" class="verify-btn">
      Verify Email Now
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
      </svg>
    </a>
    
    <p class="footer-note">🔒 Secure Verification Link • If you did not sign up for this account, you can safely ignore this email.</p>
  </div>
</body>
</html>`
            return res.send(html)


    }
    catch(err){
        console.log("not verify email");
         const html=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Failed | Math-War</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #090d16;
      background-image: 
        radial-gradient(at 0% 0%, rgba(239, 68, 68, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.15) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.5) 0px, transparent 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px 16px;
      color: #f8fafc;
    }
    .card {
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      padding: 40px 32px;
      width: 100%;
      max-width: 480px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(239, 68, 68, 0.15);
      text-align: center;
    }
    .icon-wrapper {
      width: 72px;
      height: 72px;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px auto;
      box-shadow: 0 0 25px rgba(239, 68, 68, 0.25);
    }
    .icon-wrapper svg { width: 36px; height: 36px; color: #ef4444; }
    h1 { font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 8px; }
    .subtitle { color: #94a3b8; font-size: 14.5px; line-height: 1.5; margin-bottom: 24px; }
    .error-card {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.25);
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 24px;
      color: #fca5a5;
      font-size: 14px;
      text-align: left;
    }
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 15px 24px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none;
      border-radius: 12px; font-weight: 600; font-size: 15px; transition: all 0.25s ease;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); border: none; cursor: pointer;
    }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6); }
    .footer-note { margin-top: 24px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-wrapper">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </div>
    <h1>Verification Failed</h1>
    <p class="subtitle">The verification link is invalid, expired, or has already been used.</p>
    <div class="error-card">
      <strong>Details:</strong> ${err.message || 'Token verification failed'}
    </div>
    <a href="https://cerebrowar-production.up.railway.app/api/auth/resendmail-verification" class="btn">
      Request New Verification Link
    </a>
    <p class="footer-note">If you need help, please contact our support team.</p>
  </div>
</body>
</html>`
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
      text: `Operator ${user.InstituteName},\n\nA new verification link has been issued for your Math-War account.\n\nVerify here: https://cerebrowar-production.up.railway.app/api/auth/verify-email?token=${emailVerificationToken}\n\nThis link expires in 24 hours.\n\nIf you did not request this, ignore this transmission.\n\n— Math-War Command`,
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
        <a href="https://cerebrowar-production.up.railway.app/api/auth/verify-email?token=${emailVerificationToken}" class="cta">▶ VERIFY IDENTITY NOW</a>
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
        text: `Welcome Operator ${displayName}!\n\nYour Math-War combat profile has been created via Google.\nYou can now access the arena at:\nhttps://cerebrowar-production.up.railway.app/\n\nPrepare for battle!\n\n— Math-War Command`,
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
        <a href="https://cerebrowar-production.up.railway.app/" class="cta">▶ ENTER THE ARENA</a>
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

    res.redirect( "https://cerebrowar-production.up.railway.app/")
  } catch (err) {
    console.error("GoogleCallback error:", err)
    res.redirect("https://cerebrowar-production.up.railway.app//register?error=google_failed")
  }
}
