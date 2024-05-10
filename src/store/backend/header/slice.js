 
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'header',
  initialState: {
    item:{},
    items:[],
    totalCount:10,
    status: false,
    loading: false,
    message:'' ,
    severity:'success',
    summary:'Success',
    errors: null,
    success :false,
    isMenuCollapseSlice:true
},
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
    toggleMenuCollapseSlice: (state, action) => {
      state.isMenuCollapseSlice = !state.isMenuCollapseSlice
    }
  },
});

export const { loadingStart,responseData,responseFailureStatus,failureStatus,getRecords,editRecord,successStatus ,clearState, toggleMenuCollapseSlice } = slice.actions;
export default slice.reducer;