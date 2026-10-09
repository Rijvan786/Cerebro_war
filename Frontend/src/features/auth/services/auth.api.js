import axios from "axios"
const api=axios.create({
    baseURL:"https://cerebrowar-production.up.railway.app/",
    withCredentials:true2
})

export async function Register({InstituteName,email,contact,role,password}){
    console.log(InstituteName,email,password,contact,password);
        const response=await api.post("/api/auth/register",{InstituteName,email,contact,role,password})
        console.log(response.data);
        return response.data
}

export async function Login({InstituteName,email,password}){
          
        const response=await api.post("/api/auth/login",{InstituteName,email,password})
        console.log(response.data);

        return response.data
}

export async  function Resendmail({email}){
    const response=await  api.post("/api/auth/resendmail-verification",{email})
    return response.data
}

export async function Sendforgetmail({email}){
    console.log(email,"Sendforgetmail");
    const response=await api.post("/api/auth/sendforgetmail",{email})
    return response.data

}

export async function ForgetPassword({email,newpassword}){
    const response=await api.post("/api/auth/forgetpassword",
                 {email,
                  newpassword
                 })
                     return response.data
}
export async function Logout(){
    const response =await api.get("/api/auth/logout")
    return response.data
}

export async function Getme(){
    const response=await api.get("/api/auth/getme")
    console.log(response);
    return response.data
}