import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialExpenseState={expense:0}
const expenseSlice=createSlice({
    name:"expense",
    initialState:initialExpenseState,
    reducers:{
        add(state,action){
          console.log(action.payload);
          console.log(typeof(action.payload));
          state.expense=state.expense+action.payload;
        },
        remove(state,action){
           state.expense=state.expense-action.payload;
        }
    }
})
export const expenseActions=expenseSlice.actions;
export default expenseSlice.reducer;