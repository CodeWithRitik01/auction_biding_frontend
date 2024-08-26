import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { server } from "../../constants/config"

const INITIALSTATE = {
    users:[],
    user: null,
    auctions:[],
    loggedIn:false
}

export const getInitialStateAsync = createAsyncThunk("api/user",
    () => {
        try {
            const config = {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                }
              };
            const data = axios.get(`${server}/api/users`, config);
            return data
            
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    
    }
)


export const getInitialAuctionAsync = createAsyncThunk("api/auction",
    () => {
        try {
            const config = {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                }
              };
            const data = axios.get(`${server}/api/auction`, config);
            return data
            
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    
    }
)
const auctionSlice = createSlice({
    name:"auctionBidding", 
    initialState:INITIALSTATE,
    reducers:{
        addUser:(state, action) =>{
            state.users.push(action.payload.user)
        },
        userExists: (state, action) =>{
            state.user = action.payload;
        },
        setLoggedIn:(state, action) =>{
            state.loggedIn = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getInitialStateAsync.fulfilled, (state, action)=>{
            state.users = [...action.payload.data.users]
            state.user = action.payload.data.user
        })
        builder.addCase(getInitialAuctionAsync.fulfilled, (state, action)=>{
            state.auctions = [...action.payload.data.item]
            console.log(state.auctions)
        })
    }
})

export const auctionReducer = auctionSlice.reducer;
export const actions = auctionSlice.actions;

export const auctionSelector = (state)=> state.auctionReducer;