"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface sidebarState{
    isSideBarOpen: boolean
    sideBarForSmall:boolean
}

const initialState:sidebarState= {
    isSideBarOpen: true,
    sideBarForSmall:false
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setIsSideBarOpen: (state, action) => {
            state.isSideBarOpen = action.payload;
        },
        setIsSideBarForSmall:(state,action)=>{
            state.sideBarForSmall=action.payload
        }
    },

})
export const {setIsSideBarOpen,setIsSideBarForSmall}=sidebarSlice.actions
export default sidebarSlice.reducer