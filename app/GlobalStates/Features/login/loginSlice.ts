"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface LoginState{
    isLoggedIn: boolean
}

export const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setLoginState: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },

})
export const {setLoginState}=loginSlice.actions
export default loginSlice.reducer