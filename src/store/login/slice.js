import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated : false,
  accessToken     : null,
  user            : null,
  isLoading       : false,
  error           : null,
  expireTime      : null,
  refreshToken    : null ,
  message         :'' ,
  severity        :'success',
  summary         :'Success',
  seterrors       : null,
  success         :false,
  setError         :false,
};
 
const authReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
      loginStart: (state) => {
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
        // state.accessToken     = action.payload.data.token
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
        state.message   = action 
        state.severity  = 'error'
        state.summary   = 'Failed'  
      },
      responseFailureStatus: (state, action) => {
          state.status    = true
          state.isLoading = false 
          state.message   = action.payload.data.message 
          state.severity  = 'error'
          state.summary   = 'Failed'
          state.seterrors =  action.payload.data.errors 
      },
      setAccessToken: (state, action) => {
        state.accessToken   = action.payload;
        state.refreshToken  = action.payload;
        state.expireTime    = action.payload;
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
  },
});

export const { loginSuccess, logoutSuccess ,setAccessToken ,loginFailure,loginStart,resetState,responseFailureStatus,logout} = authReducer.actions;
export default authReducer.reducer;