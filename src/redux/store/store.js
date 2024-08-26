import { configureStore } from "@reduxjs/toolkit";
import { auctionReducer } from "../reducers/auction";

export const store = configureStore({
    reducer:{
        auctionReducer
    }
})
