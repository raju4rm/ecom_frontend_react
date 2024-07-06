import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPermission: true,
    item:{},
    items:[],
    totalCount:0,
    status: false,
    loading: false,
    message:'' ,
    severity:'success',
    summary:'Success',
    errors: null,
    success :false,
};
const slice = createSlice({
 name: 'permission',
 initialState,
 reducers: {  
   loadingStart: (state, action) => { 
     state.status    = false
     state.loading   = true  
   },
   responseData: (state, action) => {  
     state.status      = false
     state.loading     = false 
     state.totalCount  = action.payload.totalCount 
     state.items       = action.payload.data 
   },
   
   successStatus: (state, action) => {  
     state.status    = true
     state.loading   = false
     state.success   = true
     state.severity  = 'success'
     state.summary   = 'Sucess'
     state.message   = action.payload.message 
   },
   editRecord:(state,action)=>{
     state.status    = false
     state.loading   = false 
     state.item      = action.payload.data[0]  
   },
   getRecords:(state,action)=>{
     return {
       ...state,
       status: true,
       loading:false,
     };
   },
   failureStatus: (state, action) => { 
     state.status    = true
     state.loading   = false 
     state.message   = 'Server error' 
     state.severity  = 'error'
     state.summary   = 'Failed'  
   },
   responseFailureStatus: (state, action) => {  
       state.status    = true
       state.loading   = false 
       state.message   = action.payload.data.message 
       state.severity  = 'error'
       state.summary   = 'Failed'
       state.errors    =  action.payload.data.errors 
   },
   clearState: (state, action) => {  
     state.status    = false
     state.loading   = false 
     state.message   = '' 
     state.severity  = ''
     state.summary   = ''
     state.success   = false
     state.item      = {}
     state.errors    = null
   },
   getAllPermission:(state,action)=>{
    state.status    = false
    state.loading   = false 
    state.items     = action.payload.data 
  },
 },
});

export const { loadingStart,responseData,responseFailureStatus,failureStatus,getRecords,editRecord,successStatus ,clearState, getAllPermission } = slice.actions;
export default slice.reducer;