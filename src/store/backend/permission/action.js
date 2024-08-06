 
import { loadingStart, successStatus ,responseFailureStatus,failureStatus,responseData,editRecord,getAllPermission,getAssignedermission} from "./slice"
import axios from "../../../utils/axios";
import { useDispatch, useSelector } from 'react-redux';



//Get records with pagintion
export const getPermission = (payload) => async (dispatch) => {    
  try {
    let baseUrl     = `admin/permission` 
    const {data} = await axios.get(baseUrl);  
    if (data.status) {
      dispatch(getAllPermission(data)); 
    }   
  } catch (error) {  
      dispatch(failureStatus(error));  
  }
};
  
export const getAssignedPermission = (payload) => async (dispatch) => {    
  try {
    let baseUrl     = `admin/role/assigned-permission` 
    const {data} = await axios.post(baseUrl,payload);  
    if (data.status) {
      dispatch(getAssignedermission(data)); 
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
 