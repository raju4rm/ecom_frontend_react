import React, {createContext, useReducer} from "react";
import axios from "../utils/axios";
export const LoginContext = createContext();

const initialState = {
    isAuthenticated: false,
    status: false,
    loading: false,
    message: "",
    severity: "success",
    summary: "Success",
    errors: null,
    success: false
}
function reducer(state, action) {
    switch (action.type) {
        case "LOADING_START":
            return{
                ...state,
                status: false,
                loading: true,
            }
        
        case "SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                status: true,
                loading: false,
                success: true,
                severity: "success",
                summary: "Success",
                message: action.payload.message,
            }
        case "FAILURE":
            return {
                ...state,
                isAuthenticated: false,
                status: true,
                loading: false,
                success: false,
                severity: "error",
                summary: "Failed",
                message: action.payload.message,
                errors: action.payload.errors
            }
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                status: false,
                loading: false,
                success: true,
                severity: "success",
                summary: "Success",
                message: "Logged out successfully",

            }
    }
}

export const LoginProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setLogin = async (payload) => {
        dispatch({type: "LOADING_START"});
        try{
            const {data} = await axios.post("/admin/login", payload);
            console.log(data);
            if(data.success){
                dispatch({type: "SUCCESS", payload: data});
            }else{
                dispatch({type: "FAILURE", payload: data});
            }
        }catch(error){
            dispatch({type: "FAILURE", payload: {message: "An error occurred during login.", errors: null}});
        }
    }

    return (
        <LoginContext.Provider value={{...state, setLogin}}>
            {children}
        </LoginContext.Provider>
    )

}