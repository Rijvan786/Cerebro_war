import { createSlice } from "@reduxjs/toolkit";

const Authslice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        Loading:true,
        error:null
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
            setLoading:(state,action)=>{
            state.Loading=action.payload
        },
            seterror:(state,action)=>{
            state.error=action.payload
        }
    }
    




})

export const {setUser,setLoading,seterror}=Authslice.actions

export default Authslice.reducer