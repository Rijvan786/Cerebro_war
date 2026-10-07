import { useDispatch } from "react-redux";
import { setUser,setLoading,seterror } from "../auth.slice";
import { ForgetPassword, Getme, Login, Logout, Register, Resendmail, Sendforgetmail } from "../services/auth.api";

export function useAuth(){
    const dispatch=useDispatch()

     
    async function handleRegister({InstituteName,email,contact,role,password}){
      console.log(InstituteName,email,contact,role,password);
       try{
        dispatch(setLoading(true))

        const data=await Register({InstituteName,email,contact,role,password})
        dispatch(setUser(data.user))
        

       }
       catch(err){
        dispatch(seterror(`Error occured ${err}`))
        throw err
       }
       finally{
             dispatch(setLoading(false))
       }
    }
     async function handleLogin({InstituteName,email,password}){
       try{
     

        const data=await Login({InstituteName,email,password})
        dispatch(setUser(data.user))
        

       }
       catch(err){
        dispatch(seterror(`Error occured ${err}`))
        throw err
       }
       finally{
                  
       }
    }

    async function handleResendmail({email}){
       try {
        dispatch(setLoading(true))

        const data=await Resendmail({email})
        return data
       } catch (error) {
                  dispatch(seterror(`Error Occured ${error}`))
                  throw error
       }

       finally{
                 dispatch(setLoading(false))
       }
        
    }

    async function handlesendForgetmail({email}){
             try {
        dispatch(setLoading(true))

        const data=await Sendforgetmail({email})
        return data

        
       } catch (error) {
                  dispatch(seterror(`Error Occured ${error}`))
                  throw error
       }

       finally{
                 dispatch(setLoading(false))
       }
      
    }

    async function handleForgetPassword({email,newpassword}){
         try {
        dispatch(setLoading(true))

         const data=await ForgetPassword({email,newpassword})
           return data
        
       } catch (error) {
                  dispatch(seterror(`Error Occured ${error}`))
                  throw error
       }

       finally{
                 dispatch(setLoading(false))
       }
      
    }
    
    async function handleLogout(){
             try {
        dispatch(setLoading(true))
         const data=await Logout()
       dispatch(setUser(null))
        
       } catch (error) {
                  dispatch(seterror(`Error Occured ${error}`))
                  throw error

       }

       finally{
                 dispatch(setLoading(false))
       }
      
    }

    async function handleGetme(){
             try {
        dispatch(setLoading(true))

         const data=await Getme()
         console.log(data);

         dispatch(setUser(data.user))
        
       } catch (error) {
                  dispatch(seterror(`Error Occured ${error}`))
                
       }

       finally{
                 dispatch(setLoading(false))
       }
      
    }

    return { 
            handleRegister,
            handleLogin,
            handleResendmail,
            handlesendForgetmail,
            handleForgetPassword,
            handleLogout,
            handleGetme,
           
    }
}
