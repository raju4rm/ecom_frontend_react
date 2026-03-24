 
import { loadingStart, successStatus ,failureStatus,responseData,editRecord,clearState} from "./slice"
import axios from "../../utils/axios";
import { useDispatch, useSelector } from 'react-redux';

//add
export const setAdd = (payload) => async (dispatch) => {  
  dispatch(loadingStart());  
  // dispatch(clearState());
  try {  
      const response = await axios.post('admin/signup',payload); 
      const {data} = response;
    if (data.status) {
      dispatch(successStatus(data)); 
    }   
  } catch (error) { 
    console.log('wwww',error.response)  
    if (error.response && error.response.status === 422) { 
      dispatch(failureStatus(error.response))
    } else { 
      dispatch(failureStatus(error.response));
    } 
  }
};


 