 
import { loadingStart, successStatus ,responseFailureStatus,failureStatus,responseData,editRecord} from "./slice"
import { permisssionFailureStatus} from "../backend/permission/slice"
import axios from "../../utils/axios";
import { useDispatch, useSelector } from 'react-redux';

//add
export const setAdd = (payload) => async (dispatch) => {  
  dispatch(loadingStart());  
  try {  
      const response = await axios.post('admin/role',payload); 
      const {data} = response;
    if (data.status) {
      dispatch(successStatus(data)); 
    }   
  } catch (error) { 
    if (error.response && error.response.status === 422) { 
      dispatch(responseFailureStatus(error.response))
    } else if (error.response && error.response.status === 403) {  
      dispatch(permisssionFailureStatus(error.response))
    } else { 
      dispatch(failureStatus(error.response));
    } 
  }
};

//edit
export const setEdit = (payload) => async (dispatch) => {  
  dispatch(loadingStart());  
  try {  
      const response = await axios.put('admin/role',payload);  
      const {data} = response;
      if (data.status) {
        dispatch(successStatus(data)); 
      }   
  } catch (error) { 
      if (error.response && error.response.status === 422) {   
          dispatch(responseFailureStatus(error.response))
      } else { 
          dispatch(failureStatus(error.message));
      } 
    
  }
};

//Get Single data
export const getEdit = (payload) => async (dispatch) => {   
  try {  
    let baseUrl     = `admin/role/edit/${payload}` 
    const {data}    = await axios.get(baseUrl);  
    if (data.status) {
      dispatch(editRecord(data)); 
    }   
  } catch (error) {  
      dispatch(failureStatus(error));  
  }
};

//Get records with pagintion
export const getList = (payload) => async (dispatch) => {    
  try {
    let baseUrl     = `admin/role?search=1&page=${payload.pageNo}&per_page=${payload.limitPerPage}` 
    const {data} = await axios.get(baseUrl);  
    if (data.status) {
      dispatch(responseData(data)); 
    }   
  } catch (error) {  
      dispatch(failureStatus(error));  
  }
};
  

export const searchItem = (payload) => async (dispatch) => { 
  dispatch(loadingStart());    
  try { 
    const page      = 1
    const per_page  = 10
    let baseUrl     = `admin/role?search=1&page=${page}&per_page=${per_page}`
    const name      =  payload.name
    const slug      =  payload.slug
    const isActive      =  payload.is_active
    //console.log(payload)
    if(name) { baseUrl = `${baseUrl}&name=${name}` }
    if(slug) { baseUrl = `${baseUrl}&slug=${slug}` }
    if(isActive) { baseUrl = `${baseUrl}&isActive=${isActive}` }
    console.log(baseUrl)
    const {data} = await axios.get(baseUrl);  
    if (data.status) {
      dispatch(responseData(data)); 
    }   
  } catch (error) {  
      dispatch(failureStatus(error));  
  }
};

//assign permission
export const assignPermissionAction = (payload) => async (dispatch) => {  
  dispatch(loadingStart());  
  try {  
    const response = await axios.post('admin/role/assign-permission',payload); 
    const {data} = response;
    if (data.status) {
      dispatch(successStatus(data)); 
    }   
  } catch (error) { 
    if (error.response && error.response.status === 422) {   
        dispatch(responseFailureStatus(error.response))
    } else { 
        dispatch(failureStatus(error.message));
    } 
  }
};
 