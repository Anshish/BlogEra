import { createSlice } from "@reduxjs/toolkit";

// this is the file that contain the redux slice for auth
const initialState={
    status:false,
    userData:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        // login and logout are the actions
        login:(state,action)=>{
            state.status=true
            state.userData=action.payload
        },
        logout:(state)=>{
            state.status=false
            state.userData=null
        }
    }
})

// export the actions
export const {login,logout}= authSlice.actions

export default authSlice.reducer

