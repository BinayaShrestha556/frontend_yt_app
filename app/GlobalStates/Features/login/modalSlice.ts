"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface LoginModalState{
    isModalOpen: boolean
}

export const loginModalSlice = createSlice({
    name: 'modal',
    initialState: {
        isModalOpen: false,
    },
    reducers: {
        setLoginModalState: (state, action) => {
            state.isModalOpen = action.payload;
        },
    },

})
export const {setLoginModalState}=loginModalSlice.actions
export default loginModalSlice.reducer