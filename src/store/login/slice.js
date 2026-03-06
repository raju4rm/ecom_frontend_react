import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated : false,
  accessToken     : null,
  user            : null,
  isLoading       : false,
  error           : null,
  expireTime      : null,
  refreshToken    : null ,
  message         : '' ,
  severity        : 'success',
  summary         : 'Success',
  seterrors       : null,
  success         : false,
  setError        : false,
  status          : null
};
 
const authReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
      loginStart: (state) => {
        state.isLoading = true;
        state.error     = null;
      }, 
      loadingStart: (state) => {
        state.isLoading = true;
        state.error     = null;
      },
      loginSuccess: (state, action) => {
        state.success         = true;
        state.user            = action.payload;
        state.error           = null;
        state.isLoading       = false;
        state.seterrors       = null
        state.isAuthenticated = true;
        state.message         = 'Logged in successfully!' 
        state.severity        = 'success'
        state.summary         = 'success'
        state.accessToken     = action.payload.data[0].token
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.user            = null; 
        state.isLoading       = false;
        state.error           = null;
        state.accessToken     = null
      },
      loginFailure: (state, action) => { 
        state.status    = true
        state.isLoading = false 
        state.isAuthenticated = false;
        state.message   = action.payload.message  
        state.severity  = 'error'
        state.summary   = 'Failed' 
        state.error =  action.payload.data.errors  
      },
      responseFailureStatus: (state, action) => {
          state.status    = true
          state.isLoading = false 
          state.message   = action.payload.message 
          state.severity  = 'error'
          state.summary   = 'Failed'
          state.error =  action.payload.data.errors 
      },
      setAccessToken: (state, action) => {
        state.accessToken   = action.payload.data[0].token
        state.isAuthenticated = true
      }, 
      resetState: (state, action) => {  
        state.status    = false
        state.isLoading = false 
        state.setError  = false 
        state.message   = '' 
        state.severity  = ''
        state.summary   = ''
        state.success   = false
        state.item      = {}
        state.seterrors    = null
      },
      forgotPasswordState: (state, action) => {
        state.status    = action.payload.status
        state.message   = action.payload.message
        state.isLoading = false;
      },
      resetForgotPasswordState: (state, action) => {
        state.status    = null
        state.message   = null
        state.isLoading = false;
      },
      resetPasswordState: (state, action) => {
        state.status    = action.payload.status
        state.message   = action.payload.message
        state.isLoading = false;
      },
      resetResetPasswordState: (state, action) => {
        state.status    = null
        state.message   = null
        state.isLoading = false;
      }
  },
});

export const { loginSuccess, logoutSuccess ,setAccessToken ,loginFailure,loginStart,resetState,responseFailureStatus,logout,forgotPasswordState,resetForgotPasswordState,resetPasswordState,resetResetPasswordState,loadingStart} = authReducer.actions;
export default authReducer.reducer;