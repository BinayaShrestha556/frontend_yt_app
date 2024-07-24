"use client";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Features/login/loginSlice"
import loginModalReducer from "./Features/login/modalSlice"
import sidebarReducer from "./Features/login/sidebarSlice";
export const store= configureStore({
    reducer: {
        isLoggedIn:  loginReducer,
        loginModal: loginModalReducer,
        sidebar: sidebarReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch