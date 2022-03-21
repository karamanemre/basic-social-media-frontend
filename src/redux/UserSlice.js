import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import SecureLS from "secure-ls";
import UserServices from "../services/UserServices";

const userService = new UserServices();
const secureLS = new SecureLS();

export const login = createAsyncThunk('login',async (credential) =>{
    const res = await userService.login(credential)
    return res.data;
})

export const getAllUsers = createAsyncThunk('getAllUsers',async () =>{
    const res = await userService.getAllUsers()
    return res.data.data;
})

const handleChangeState = (state) => {
    secureLS.set("item",state.item)
    secureLS.set("isAuthentication",state.isAuthentication)
}

export const userSlice = createSlice({
    name:"user",
    initialState:{
        items:[],
        isLoading:false,
        status:"idle",
        error:"",
        item: secureLS.get("item") ? secureLS.get("item") : {},
        isAuthentication: secureLS.get("isAuthentication") ? secureLS.get("isAuthentication") : false
    },
    reducers:{
        logout:(state,action)=>{
            state.isAuthentication=false
            state.item={}
            state.status="idle"
            handleChangeState(state)
        },
    },
    extraReducers:{
         //login
        [login.pending]: (state,action) =>{
            state.status="loading"
            state.isLoading=true
            state.isAuthentication=false
        },
        [login.fulfilled]: (state,action) =>{
            state.status="succeeded"
            state.isLoading=false
            state.isAuthentication=true
            state.item = {...action.payload.data}
            handleChangeState(state)
        },
        [login.rejected]: (state,action) =>{
            state.isLoading=false
            state.status="failed"
            state.error = action.error.message
        },

        //getAllUsers
        [getAllUsers.pending]: (state,action) =>{
            state.status="loading"
            state.isLoading=true
        },
        [getAllUsers.fulfilled]: (state,action) =>{
            state.status="succeeded"
            state.isLoading=false
            state.items = [...action.payload]
        },
        [getAllUsers.rejected]: (state,action) =>{
            state.isLoading=false
            state.status="failed"
            state.error = action.error.message
        },
    }
})

export const {logout} = userSlice.actions;
export default userSlice.reducer;