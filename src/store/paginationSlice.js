import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {  
    limitPerPage:10,
    pageNo:1,
},
  reducers: {   
    setPaginationData:(state,data)=>{ 
      state.pageNo               = data.payload.page
      state.limitPerPage         = data.payload.limit 
    }
  },
});

export const { setPaginationData } = paginationSlice.actions;
export default paginationSlice.reducer;