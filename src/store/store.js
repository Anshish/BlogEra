import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";


const store=configureStore({
    // store wants to know about all the reducers
    reducer:{
        auth:authSlice
    }
})

export default store