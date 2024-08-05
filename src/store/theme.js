import { createSlice } from "@reduxjs/toolkit";

const initialPremiumState={theme:false,ispremium:false}
const premiumSlice=createSlice({
    name:"premium",
    initialState:initialPremiumState,
    reducers:{
        change(state){
          state.theme=!state.theme;
        },
        prem(state,action){
            state.ispremium=action.payload;
        }
    }
})
export const premiumActions=premiumSlice.actions;
export default premiumSlice.reducer;