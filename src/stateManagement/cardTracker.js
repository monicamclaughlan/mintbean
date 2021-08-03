import { createSlice } from "@reduxjs/toolkit";


export const player1Slice = createSlice({
    name: "player1",
    initialState: {
        hand: [], 
        score: 0
    },

    reducers: {
        addToScoreP1: (state, action)=>{
            state.score += action.payload;
        },
        addToHandP1:(state, action)=>{
            //this assumes action.payload is an array of cards
            state.hand = state.hand.concat(action.payload);
        },
        clearHandP1:(state, action)=>{
            //this assumes action.payload is an array of cards
            state.hand = [];
        },
        discardP1:(state, action)=>{
            //assuming action.payload is an array of cards
            state.hand = state.hand.filter((card)=>!action.payload.includes(card));
        },
        playCardsP1:(state, action)=>{}
    }
})

export const player2Slice = createSlice({
    name: "player2",
    initialState: {
        hand: [], 
        score: 0
    },

    reducers: {
        addToScoreP2: (state, action)=>{
            state.score += action.payload;
        },
        addToHandP2:(state, action)=>{
            //this assumes action.payload is an array of cards
            state.hand = state.hand.concat(action.payload);
        },
        clearHandP2:(state, action)=>{
            //this assumes action.payload is an array of cards
            state.hand = [];
        },
        discardP2:(state, action)=>{
            //assuming action.payload is an array of cards
            state.hand = state.hand.filter((card)=>!action.payload.includes(card));
        },
        playCardsP2:(state, action)=>{}
    }
})

export const discardPileSlice = createSlice({
    name: "discardPile",
    initialState: {
       discardPile: []
    },
    reducers: {
        addToDiscard: (state, action)=>{
            state.discardPile = state.discardPile.concat(action.payload);
        },
        takeFromDiscard: (state, action)=>{
            state.discardPile = state.discardPile.filter((card)=>!action.payload.includes(card))
        }
    }
})

//exports here
export const {addToDiscard, takeFromDiscard} = discardPileSlice.actions;
export const {addToHandP1, addToScoreP1, playCardsP1, clearHandP1, discardP1} = player1Slice.actions;
export const {addToHandP2, addToScoreP2, playCardsP2, clearHandP2, discardP2} = player2Slice.actions;

