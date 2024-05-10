import { configureStore } from "@reduxjs/toolkit"; 
import { useDispatch } from 'react-redux';
import header from './backend/header/slice'
import permission from './backend/permission/slice'
import login from './login/slice'

const store = configureStore({
    reducer: {
      header:header,
      permission: permission,
      login: login
    },
});
  
export default store;