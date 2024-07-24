"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface sidebarState{
    isSideBarOpen: boolean
}
const initialState:sidebarState= {
    isSideBarOpen: true,
}
export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setIsSideBarOpen: (state, action) => {
            state.isSideBarOpen = action.payload;
        },
    },

})
export const {setIsSideBarOpen}=sidebarSlice.actions
export default sidebarSlice.reducer