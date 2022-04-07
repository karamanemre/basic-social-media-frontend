import {configureStore} from "@reduxjs/toolkit";
import darkModeSlice from "./DarkModeSlice";
import flowSlice from "./FlowSlice";
import userSlice from "./UserSlice";

export const store = configureStore({
    reducer:{
        user:userSlice,
        flow:flowSlice,
        darkMode:darkModeSlice
    },
    
})


