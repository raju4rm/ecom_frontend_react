import axios from "../../utils/axios"; 
import { persistor } from "../reduxPersist";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  responseFailureStatus,
  logout,
  resetState,
  forgotPasswordState,
  resetPasswordState,
  loadingStart
} from './slice';
import { setCookie } from "../../utils/cookieService";

export const login = (credentials) => async (dispatch) => { 
  dispatch(loginStart()); 
  try { 
    const {data} = await axios.post('/admin/login', credentials); 
    if (!data.status) {
      dispatch(loginFailure(data)); 
    } 
     
    const currentTime     = new Date(); 
    const expirationTime  = new Date(currentTime.getTime() + 5 * 60 * 60 * 1000); 
    // localStorage.setItem('expireIn',expirationTime.getTime());
    // localStorage.setItem('access_token',data.data[0].token); 
    // setCookie('myCookieAccessToken', data.data[0].token,{});  
    dispatch(loginSuccess(data));
  } catch (error) {  
    if (error.response && error.response.status === 422) {   
        dispatch(responseFailureStatus(error.response))
    }else{
        dispatch(loginFailure(error.message));
    }
    
  }
};
export const reset =()=>async (dispatch)=>{
    dispatch(resetState());
} 

export const logoutA = (navigate) => async (dispatch) => {
  try {
    await axios.post("admin/logout");
    dispatch(logout());
    await persistor.purge();
    // navigate("/login", { replace: true });
  } catch (error) {
    console.error(error);
  } 
};

export const forgotPassword = (payload) => async (dispatch) => {
  dispatch(loadingStart());
  try{
    const {data} = await axios.post('admin/forgot-password',payload);
    console.log(data);
    dispatch(forgotPasswordState(data));
  }catch(error){
    const response = error.response?.data;

    dispatch(forgotPasswordState({
      status: false,
      message: response?.errors.email || "Validation failed",
    }));
  }
}

export const resetPassword = (payload) => async (dispatch) => {
  dispatch(loadingStart());
  try{
    const { token, ...body } = payload;
    // console.log(token, body);
    const {data} = await axios.post(`admin/reset-password/${token}`,body);
    dispatch(resetPasswordState(data))
  }catch(error){
    const response = error.response?.data;
    console.log('=====',response);
    dispatch(resetPasswordState({
      status: false,
      message: response?.cpassword || response?.message || "Validation failed",
    }));
  }
}
