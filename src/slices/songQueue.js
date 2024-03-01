import { createSlice } from "@reduxjs/toolkit";


const songQueueSlice = createSlice({
    name: 'songQueue',
    initialState: {
        queue: [],
    },
    reducers:{
        addSongToQueue: (state, action) => {
            state.queue.push(action.payload);
        },
    }
})

export default songQueueSlice.reducer;
export const { addSongToQueue } = songQueueSlice.actions;