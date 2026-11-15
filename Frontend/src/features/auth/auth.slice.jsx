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
        },
        clearError:(state)=>{
            state.error=null
        }
    }
    




})

export const {setUser,setLoading,seterror,clearError}=Authslice.actions

export default Authslice.reducer