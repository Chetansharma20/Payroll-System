// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {

//     companyData:{},
//     isLogin: false,

// };
// let userSlice = createSlice({
//     name:"userData",
//     initialState,
//     reducers:{

//         login:(state, actions)=>
//         {
            
//             state.companyData = actions.payload
//             state.isLogin = true
//             // localStorage.setItem("userType", "admin");
//         },

//         logout:(state)=>
//         {
//             state.companyData = {};
//             state.isLogin = false
//             // localStorage.removeItem("userType");
        
//         }
//     }

// })
// export const{login, logout} = userSlice.actions
// export default userSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyData: {},
  isLogin: false,
};

const userSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    login: (state, action) => {
      state.companyData = action.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      state.companyData = {};
      state.isLogin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;