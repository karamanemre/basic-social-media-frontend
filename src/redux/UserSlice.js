import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
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

export const loggedInUser = createAsyncThunk('loggedInUser',async (username) =>{
    const res = await userService.getUser(username)
    return res.data.data;
})

export const getUserById = createAsyncThunk('getUserById',async (value) =>{
    const {id} = value
    const res = await userService.getUserById(id);
    return res.data.data;
})

const handleChangeState = (state) => {
    secureLS.set("item",state.item)
    secureLS.set("loggedInUser",state.loggedInUser)
    secureLS.set("isAuthentication",state.isAuthentication)
}

export const userSlice = createSlice({
    name:"user",
    initialState:{
        items:[],
        isLoading:false,
        status:"idle",
        error:"",
        item: secureLS.get("item") ? secureLS.get("item") : {},//login
        isAuthentication: secureLS.get("isAuthentication") ? secureLS.get("isAuthentication") : false,
        user:{},//update and getUser
        images:[],
        loggedInUser: secureLS.get("loggedInUser") ? secureLS.get("loggedInUser") : {},
        isSuccessful:false,
    },
    reducers:{
        logout:(state,action)=>{
            state.isAuthentication=false
            state.items=[]
            state.item={}
            state.user={}
            state.status="idle"
            state.images=[]
            state.loggedInUser={}
            handleChangeState(state)
        },

        imagesChange:(state,action)=>{
            const {profileImage,backgroundImage} = action.payload
            state.images=[profileImage,backgroundImage]
        },

        getUser:async (state,action)=>{
          const res =  await userService.getUser(action.payload)
          return res.data.data;
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
            state.isSuccessful = false
        },
        [update.fulfilled]: (state,action) =>{
            state.status="succeeded"
            state.isLoading=false
            state.user = action.payload
            state.loggedInUser = action.payload
            state.isSuccessful = true
            handleChangeState(state)
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

          //loggedInUser
          [loggedInUser.pending]: (state,action) =>{
            state.status="loading"
            state.isLoading=true
        },
        [loggedInUser.fulfilled]: (state,action) =>{
            state.status="succeeded"
            state.isLoading=false
            state.loggedInUser = action.payload
            handleChangeState(state)
        },
        [loggedInUser.rejected]: (state,action) =>{
            state.isLoading=false
            state.status="failed"
            state.error = action.error.message
        },

         //getUserById
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