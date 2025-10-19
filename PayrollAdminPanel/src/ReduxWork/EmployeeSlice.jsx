// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   profile: null,
//   role: null,
//   token: null,
//   isAuthenticated: false,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     // Support both shapes:
//     // 1) dispatch(login({ profile, role, token }))
//     // 2) dispatch(login(profileObject))  -- what Login.jsx currently sends
//     login: (state, action) => {
//       const payload = action.payload || {};
//       // if wrapped payload with `profile`, use it; otherwise assume payload is the profile itself
//       state.profile = payload.profile ?? payload;
//       state.role = payload.role ?? "employee";
//       state.token = payload.token ?? localStorage.getItem("token") ?? null;
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.profile = null;
//       state.role = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       // ensure userType is cleared when employee logs out
//       try {
//         localStorage.removeItem("userType");
//       } catch (e) {
//         // ignore in non-browser environments
//       }
//     },
//   },
// });

// export const { login, logout } = userSlice.actions;
// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  EmployeeData: {},
  isLogin: false,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    login: (state, action) => {
      state.EmployeeData = action.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      state.EmployeeData = {};
      state.isLogin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
    },
  },
});

export const { login, logout } = employeeSlice.actions;
export default employeeSlice.reducer;