import axios from "../../utils/axios"; 
 
import {
  loginStart,
  loginSuccess,
  loginFailure,
  responseFailureStatus,
  logout,
  resetState,
} from './slice';
import { setCookie } from "../../utils/cookieService";

export const login = (credentials) => async (dispatch) => { 
  dispatch(loginStart()); 
  try { 
    const {data} = await axios.post('/admin/login', credentials); 
    if (!data.status) {
      dispatch(loginFailure('Credential required!')); 
    } 
     
     
    const currentTime     = new Date(); 
    const expirationTime  = new Date(currentTime.getTime() + 5 * 60 * 60 * 1000); 
    localStorage.setItem('expireIn',expirationTime.getTime());
    localStorage.setItem('access_token',data.data[0].token); 
    setCookie('myCookieAccessToken', data.data[0].token,{});  
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

export const logoutA =()=>async (dispatch)=>{
  dispatch(logout());
} 