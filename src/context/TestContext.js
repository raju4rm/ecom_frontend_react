import React, {createContext, useReducer} from "react";
import axios from "../utils/axios";
export const TestContext = createContext();

const initialState = {
    item: {},
    items: [],
    totalCount: 0,
    status: false,
    loading: false,
    message: "",
    severity: "success",
    summary: "Success",
    errors: null,
    success: false,
};

function reducer(state, action){
    switch(action.type){
        case "LOADING_START":
            return{
                ...state,
                status: false,
                loading: true,
            }
        
        case "RESPONSE_DATA":
            return{
                ...state,
                status: false,
                loading: false,
                totalCount: action.payload.totalCount,
                items: action.payload.items,
            }
         case "SUCCESS":
            return {
                ...state,
                status: true,
                loading: false,
                success: true,
                severity: "success",
                summary: "Success",
                message: action.payload.message,
            };
    }
}

export const TestProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setAdd = async (payload) => {
        dispatch({ type: "LOADING_START" });
        try{
            const {data} = await axios.post("admin/test", payload);
            if(data.status){
                dispatch({ type: "SUCCESS", payload: data });
            }
        }catch(error){
            dispatch({ type: "FAILURE", payload: error.message });
        }
    }
    return (
        <TestContext.Provider value={{ ...state, dispatch, setAdd }}>
            {children}
        </TestContext.Provider>
    );

}

