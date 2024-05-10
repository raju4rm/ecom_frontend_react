import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'permission',
    initialState: {
        isPermission: true,
        userId: '',
        userName:'',
    },
    reducers: {
        login: (state,action) => {
            state.isPermission= true
            state.userId= 1
            state.userName= 2
        },

        logout: (state,action) => {
            state.isPermission= false
            state.userId= 1
            state.userName= 2
        } 
    }
})

export const {login, logout} = slice.actions;
export default slice.reducer;