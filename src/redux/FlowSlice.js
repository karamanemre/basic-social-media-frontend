import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FlowService from "../services/FlowService";

const flowService = new FlowService();

export const addFlow = createAsyncThunk('addFlow',async (flowAndCredential) =>{
    const {values,credential} = flowAndCredential
    const res = await flowService.add(values,credential)
    return res.data.data;
})

export const getFlows = createAsyncThunk('getFlows',async (pagination) =>{
    const {pageNo,pageSize} = pagination
    const res = await flowService.getAll(pageNo,pageSize)
    return res.data.data;
})

export const getFlowsByUsername = createAsyncThunk('getFlowsByUsername',async (value) =>{
    const {username,pageNo,pageSize} = value
    const res = await flowService.getAllByUsername(username,pageNo,pageSize)
    return res.data.data;
})

export const getFlowIdGreaterThan = createAsyncThunk('getFlowIdGreaterThan',async (value) =>{
    const {id} = value
    const res = await flowService.getFlowIdGreaterThan(id)
    return res.data.data;
})

export const deleteById = createAsyncThunk('deleteById',async (value) =>{
    const res = await flowService.deleteById(value)
    return res.data.data;
})



export const flowSlice = createSlice({
    name:"flow",
    initialState:{
        isLoading:false,
        status:"idle",
        error:"",
        paginationProperites:{},
        content:[],
        pageNo:1,
    },
    reducers:{
        changePageNo:(state)=>{
            state.pageNo += 1
        },
        resetContent:(state)=>{
            state.content=[]
        },
    },
    extraReducers:{
        // AddFlow
        [addFlow.pending]: (state,action) =>{
            state.status="loading"
            state.isLoading=true
        },
        [addFlow.fulfilled]: (state,action) =>{
            state.status="succeeded"
            state.isLoading=false
            state.content=[action.payload,...state.content]
        },
        [addFlow.rejected]: (state,action) =>{
            state.isLoading=false
            state.status="failed"
            state.error = action.error.message
        },

        // GetFlow
        [getFlows.pending]: (state,action) =>{
            state.status="loading"
            state.isLoading=true
        },
        [getFlows.fulfilled]: (state,action) =>{
            state.status="succeeded"
            state.isLoading=false
            state.paginationProperites=action.payload
            state.content=[...state.content,...action.payload.content]
        },
        [getFlows.rejected]: (state,action) =>{
            state.isLoading=false
            state.status="failed"
            state.error = action.error.message
        },

        // GetFlowsByUserId
        [getFlowsByUsername.pending]: (state,action) =>{
            state.status="loading"
            state.isLoading=true
        },
        [getFlowsByUsername.fulfilled]: (state,action) =>{
            state.status="succeeded"
            state.isLoading=false
            state.paginationProperites=action.payload
            state.content=[...state.content,...action.payload.content]
        },
        [getFlowsByUsername.rejected]: (state,action) =>{
            state.isLoading=false
            state.status="failed"
            state.error = action.error.message
        },


        // getFlowIdGreaterThan
        [getFlowIdGreaterThan.pending]: (state,action) =>{
            state.status="loading"
            state.isLoading=true
        },
        [getFlowIdGreaterThan.fulfilled]: (state,action) =>{
            state.status="succeeded"
            state.isLoading=false
            state.content=[...action.payload,...state.content]
        },
        [getFlowIdGreaterThan.rejected]: (state,action) =>{
            state.isLoading=false
            state.status="failed"
            state.error = action.error.message
        },

        // deleteById
        [deleteById.pending]: (state,action) =>{
            state.status="loading"
            state.isLoading=true
        },
        [deleteById.fulfilled]: (state,action) =>{
            state.status="succeeded"
            state.isLoading=false
            state.content= state.content.filter( (c) => c.id !== action.meta.arg)
        },
        [deleteById.rejected]: (state,action) =>{
            state.isLoading=false
            state.status="failed"
            state.error = action.error.message
        },
    }
})

export const {changePageNo,resetContent} = flowSlice.actions;
export default flowSlice.reducer;