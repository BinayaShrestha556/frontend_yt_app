"use client";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Features/login/loginSlice"
import loginModalReducer from "./Features/modalSlice"
import sidebarReducer from "./Features/sidebarSlice";
import userReducer from "./Features/userInfoSlice"
export const store= configureStore({
    reducer: {
        isLoggedIn:  loginReducer,
        loginModal: loginModalReducer,
        sidebar: sidebarReducer,
        user:  userReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch