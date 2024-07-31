import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense";
import authReducer from "./auth";


const store=configureStore({
    reducer:{expense:expenseReducer,auth:authReducer}
});

export default store;