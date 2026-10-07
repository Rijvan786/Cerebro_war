import dotenv from "dotenv"
dotenv.config()


const {
    MONGO_URI,BACKEND_PORT,JWT_SECRET,EMAIL_USER,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,

    GOOGLE_REFRESH_TOKEN,GOOGLE2_CLIENT_ID,GOOGLE2_CLIENT_SECRET,NODE_ENV    
    
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


if(!GOOGLE2_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables")
}

if(!GOOGLE2_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in environment variables")
} 
if(!NODE_ENV){
    throw new Error("NODE_ENV is not defined in environment variable")
}
export const  Configure={
    MONGO_URI,
    PORT: BACKEND_PORT || 3000,
    JWT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    EMAIL_USER,
    GOOGLE_REFRESH_TOKEN,
    GOOGLE2_CLIENT_ID,
    GOOGLE2_CLIENT_SECRET,
    NODE_ENV:NODE_ENV || "development"
    
}

