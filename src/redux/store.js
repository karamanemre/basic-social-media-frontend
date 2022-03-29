import {configureStore} from "@reduxjs/toolkit";
import flowSlice from "./FlowSlice";
import userSlice from "./UserSlice";

export const store = configureStore({
    reducer:{
        user:userSlice,
        flow:flowSlice
    },
    
})


