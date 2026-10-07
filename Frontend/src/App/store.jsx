import { configureStore } from "@reduxjs/toolkit";
import Authslice from "../features/auth/auth.slice.jsx"


export const store=configureStore({
    reducer:{
        auth:Authslice,
      
    }
})

