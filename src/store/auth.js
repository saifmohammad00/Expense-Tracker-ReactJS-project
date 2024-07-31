import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    isAuthenticated:false,
    token:"",
}
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state){
           state.isAuthenticated=true;
        },
        logout(state){
            state.isAuthenticated=false;
        },
        setToken(state,action){
            state.token=action.payload;
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;