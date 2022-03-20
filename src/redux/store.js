import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";

export const store = configureStore({
    reducer:{
        user:userSlice
    },
    //devTools: window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
})