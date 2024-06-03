import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProfile, IUser } from "../../types/app";
import { getProfile } from "../../lib/api/call/profile";

interface IAuthState {
    user: IProfile | null | undefined;
    token: string;
 }

 const initialState: IAuthState = {
    token: "",
    user: undefined,
 };

export const counterSlice = createSlice({
        name: "counter",
        initialState,
        reducers: {
           SET_LOGIN: (
              state,
              action: PayloadAction<{ user: IProfile; token: string }>
           ) => {
              state.user = action.payload.user;
              state.token = action.payload.token;
           },  

           SET_LOGOUT: (state) => {
            localStorage.removeItem("token");
            state.user = undefined;
            state.token = "";
         },
 }})

 export const getProfileAsync = createAsyncThunk (
   "auth/getProfile",
   async (token: string) => {
      try {
         const { data } = await getProfile(token);

         return data.data
      } catch (error) {
         console.log(error)
      }
   }
 )

 export const { SET_LOGIN, SET_LOGOUT } = counterSlice.actions;
 export default counterSlice.reducer;


 