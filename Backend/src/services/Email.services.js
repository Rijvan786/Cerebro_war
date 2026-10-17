// import nodemailer from "nodemailer"
// import { Configure } from "../config/config.js"
// import dns from "dns"
// dns.setDefaultResultOrder('ipv4first')


// const transporter =nodemailer.createTransport({
//     service:'gmail',
//     family:4,
//     auth:{
//         type:'OAuth2',
//         clientId:Configure.GOOGLE_CLIENT_ID,
//         clientSecret:Configure.GOOGLE_CLIENT_SECRET,
//         refreshToken:Configure.GOOGLE_REFRESH_TOKEN,
//         user:Configure.EMAIL_USER,
//         pass:Configure.EMAIL_PASSWORD
//              },
   
    
// })

// transporter.verify().then(()=>{
//     console.log("Transporter is Ready to send mail");
// }).catch((err)=>{
//       console.log("Error occur in Email Transporter",err);
// })


// export async function Sendmail({to,subject,text="",html}){
//     const mailOption ={
//         from:Configure.EMAIL_USER,
//         to,
//         subject,
//         text,
//         html
//     }
//     const details=await transporter.sendMail(mailOption)
//     console.log(details);


// }



import emailjs    from "@emailjs/nodejs"
import { Configure } from "../config/config.js"



export async function SendmailDynamic({email,subject,html}){

const templateParams={
      to_email:email,
      subject_line:subject,
      dynamic_html_content:html
}
      await emailjs.send(
        Configure.EMAILJS_SERVICE_ID,
        Configure.EMAILJS_TEMPLATE_ID,
       templateParams,
        {
            publicKey:Configure.EMAILJS_PUBLIC_KEY,
            privateKey:Configure.EMAILJS_PRIVATE_KEY
       
        }).then((res)=>{
            console.log(`Email is send successfully ${res.status} to ${email}`);
        }).catch((err)=>{
            console.log(`Error occurred Sending mail ${err.message}`);
        })


}