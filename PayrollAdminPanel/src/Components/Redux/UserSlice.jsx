import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: null,
  role: null,
  token: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.profile = action.payload.profile
      state.role = action.payload.role
      state.token = action.payload.token || null
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.profile = null
      state.role = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
