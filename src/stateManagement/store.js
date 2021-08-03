import { configureStore } from "@reduxjs/toolkit";
import { player1Slice, player2Slice, discardPileSlice } from "./cardTracker";


export default configureStore({
    reducer: {
        discard: discardPileSlice.reducer,
        player1: player1Slice.reducer,
        player2: player2Slice.reducer,
    },
});