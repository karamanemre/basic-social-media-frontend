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

export const update = createAsyncThunk('update',async (userAndCredential) =>{
    const {values,credential} = userAndCredential
    const res = await userService.update(values,credential)
    return res.data.data;
})

export const getAllUsers = createAsyncThunk('getAllUsers',async () =>{
    const res = await userService.getAllUsers()
    return res.data.data;
})

export const getUser = createAsyncThunk('getUser',async (username) =>{
    const res = await userService.getUser(username)
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
        isAuthentication: secureLS.get("isAuthentication") ? secureLS.get("isAuthentication") : false,
        user:{},
        images:[]
    },
    reducers:{
        logout:(state,action)=>{
            state.isAuthentication=false
            state.item={}
            state.status="idle"
            handleChangeState(state)
        },

        imagesChange:(state,action)=>{
            const {profileImage,backgroundImage} = action.payload
            console.log(profileImage);
            state.images=[profileImage]
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
            state.isAuthentication=false
        },

         //update
         [update.pending]: (state,action) =>{
            state.status="loading"
            state.isLoading=true
        },
        [update.fulfilled]: (state,action) =>{
            state.status="succeeded"
            state.isLoading=false
            state.user = action.payload
        },
        [update.rejected]: (state,action) =>{
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

         //getUser
         [getUser.pending]: (state,action) =>{
            state.status="loading"
            state.isLoading=true
        },
        [getUser.fulfilled]: (state,action) =>{
            state.status="succeeded"
            state.isLoading=false
            state.user = action.payload
        },
        [getUser.rejected]: (state,action) =>{
            state.isLoading=false
            state.status="failed"
            state.error = action.error.message
        },
    }
})

export const {logout,imagesChange} = userSlice.actions;
export default userSlice.reducer;