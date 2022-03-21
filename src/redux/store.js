import { applyMiddleware, compose, configureStore, isAsyncThunkAction } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore({
    reducer:{
        user:userSlice
    },
    
})
//window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()


