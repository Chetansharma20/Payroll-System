import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    companyData:{},
    isLogin: false,

};
let userSlice = createSlice({
    name:"userData",
    initialState,
    reducers:{

        login:(state, actions)=>
        {
            
            state.companyData = actions.payload
            state.isLogin = true
            
        },

        logout:(state)=>
        {
            state.companyData = {};
            state.isLogin = false
        
        }
    }

})
export const{login, logout} = userSlice.actions
export default userSlice.reducer