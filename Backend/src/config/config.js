import {config} from "dotenv"
config()


const {
    MONGO_URI,BACKEND_PORT,JWT_SECRET,EMAIL_USER,EMAIL_PASSWORD,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,

    GOOGLE_REFRESH_TOKEN,EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,EMAILJS_PUBLIC_KEY,EMAILJS_PRIVATE_KEY,GOOGLE2_CLIENT_ID,GOOGLE2_CLIENT_SECRET,NODE_ENV    
    
}=process.env;
    

if(!MONGO_URI){
    throw new Error("MONGO_URI is not defined in environment variables")
}

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment variables")
}

if(!GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables")
}

if(!GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in environment variables")
}

if(!EMAIL_USER){
    throw new Error("EMAIL_USER is not defined in environment variables")
}

if(!GOOGLE_REFRESH_TOKEN){
    throw new Error("GOOGLE_REFRESH_TOKEN is not defined in environment variables")
}
if(!EMAIL_PASSWORD){
    throw new Error("EMAIL_PASSWORD is not defined in environment variables")
}


if(!GOOGLE2_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables")
}

if(!GOOGLE2_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in environment variables")
} 
if(!NODE_ENV){
    throw new Error("NODE_ENV is not defined in environment variable")
}
if(!EMAILJS_SERVICE_ID){
    throw new Error("EMAILJS_SERVICE_ID is not defined in environment variable")
}
if(!EMAILJS_TEMPLATE_ID){
    throw new Error("EMAILJS_TEMPLATE_ID is not defined in environment variable")
}
if(!EMAILJS_PUBLIC_KEY){
    throw new Error("EMAILJS_PUBLIC_KEY is not defined in environment variable")
}
if(!EMAILJS_PRIVATE_KEY){
    throw new Error("EMAILJS_PRIVATE_KEY is not defined in environment variable")
}
export const  Configure={
    MONGO_URI:MONGO_URI,
    BACKEND_PORT: BACKEND_PORT || 3000,
    JWT_SECRET:JWT_SECRET,
    GOOGLE_CLIENT_ID:GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:GOOGLE_CLIENT_SECRET,
    EMAIL_USER:EMAIL_USER,
    EMAIL_PASSWORD:EMAIL_PASSWORD,
    GOOGLE_REFRESH_TOKEN:GOOGLE_REFRESH_TOKEN,
    GOOGLE2_CLIENT_ID:GOOGLE2_CLIENT_ID,
    GOOGLE2_CLIENT_SECRET:GOOGLE2_CLIENT_SECRET,
    NODE_ENV:NODE_ENV || "development",
    EMAILJS_SERVICE_ID:EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID:EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY:EMAILJS_PUBLIC_KEY,
    EMAILJS_PRIVATE_KEY:EMAILJS_PRIVATE_KEY
}

 