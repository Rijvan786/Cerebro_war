import nodemailer from "nodemailer"
import { Configure } from "../config/config.js"
import dns from "dns"
dns.setDefaultResultOrder('ipv4first')


const transporter =nodemailer.createTransport({
    service:'gmail',
    port:587,
    secure:false,
    auth:{
        type:'OAuth2',
        clientId:Configure.GOOGLE_CLIENT_ID,
        clientSecret:Configure.GOOGLE_CLIENT_SECRET,
        refreshToken:Configure.GOOGLE_REFRESH_TOKEN,
        user:Configure.SMTP_USER,
        pass:Configure.SMTP_PASSWORD
             },
   
    
})
console.log(Configure.SMTP_USER,Configure.GOOGLE_CLIENT_ID,Configure.GOOGLE_REFRESH_TOKEN);

transporter.verify().then(()=>{
    console.log("Transporter is Ready to send mail");
}).catch((err)=>{
      console.log("Error occur in Email Transporter",err);
})


export async function Sendmail({to,subject,text="",html}){
    const mailOption ={
        from:Configure.SMTP_USER,
        to,
        subject,
        text,
        html
    }
    const details=await transporter.sendMail(mailOption)
    console.log(details);


}


