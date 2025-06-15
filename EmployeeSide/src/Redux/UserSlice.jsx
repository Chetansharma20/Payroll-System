import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    EmployeeData: {},
    isLogin: false,

}
let userSlice = createSlice({
    name:"EmployeeData",
    initialState,
    reducers:{
        login:(state,actions)=>
        {
            state.EmployeeData = actions.payload
            state.isLogin = true
        },
         logout:(state)=>
        {
            state.EmployeeData = {};
            state.isLogin = false
        
        }
    }
})
export const{login, logout} = userSlice.actions
export default userSlice.reducer