import {  createSlice } from "@reduxjs/toolkit";


export const darkModeSlice = createSlice({
    name:"darkMode",
    initialState:{
        darkMode:false,
    },
    reducers:{
        changeDarkMode:(state)=>{
            state.darkMode = !state.darkMode
        },
    },
})

export const {changeDarkMode} = darkModeSlice.actions;
export default darkModeSlice.reducer;