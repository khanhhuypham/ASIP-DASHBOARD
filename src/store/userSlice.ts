import { combineReducers, createSlice } from "@reduxjs/toolkit";


import { IRootState } from ".";
import CookieUtils from "../utils/cookie-utils";
import { User } from "../models/user";

const initialState = {
    user: CookieUtils.getCurrentUser() as User
};


export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        addUser(state, { payload }) {
            state.user = payload;
        },
    },
});

export const { addUser } = userSlice.actions;


