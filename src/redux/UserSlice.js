import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import UserServices from "../services/UserServices";

const userService = new UserServices();

export const login = createAsyncThunk('login',async (credential) =>{
    const res = await axios.post(`/api/auth/authenticationHandle`,{},{ auth: credential });
    return res.data;
})

export const userSlice = createSlice({
    name:"user",
    initialState:{
        items:[],
        isLoading:false,
        status:"idle",
        error:"",
        item:{},
        isAuthentication:false
    },
    reducers:{
        logout:(state,action)=>{
            state.isAuthentication=false
            state.item={}
            state.status="idle"
        },
    },
    extraReducers:{
        [login.pending]: (state,action) =>{
           
            state.status="loading"
            state.isLoading=true
            state.isAuthentication=false
        },
        [login.fulfilled]: (state,action) =>{
            console.log(login.username);
            state.status="succeeded"
            state.isLoading=false
            state.isAuthentication=true
            state.item = {...action.payload.data}
        },
        [login.rejected]: (state,action) =>{
            
            state.isLoading=false
            state.status="failed"
            state.error = action.error.message
        },
    }
})

export const {logout} = userSlice.actions;
export default userSlice.reducer;