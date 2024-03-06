import { createSlice } from "@reduxjs/toolkit";

const lobbySlice = createSlice({
  name: "lobby",
  initialState: {
    lobbyID: null,
    lobbyCode: null,
    lobbyMembers: [],
    lobbyQueue: [],
  },
  reducers: {
    setLobbyInfo: (state, action) => {
      state.lobbyID = action.payload._id;
      state.lobbyCode = action.payload.code;
      state.lobbyMembers = action.payload.members;
      state.lobbyQueue = action.payload.queue;
    },
    updateLobbyQueue: (state, action) => {
      state.lobbyQueue = action.payload;
    },
    updateLobbyMembers: (state, action) => {
      state.lobbyMembers = action.payload;
    },
  },
});

export default lobbySlice.reducer;
export const {
  setLobbyInfo,
  updateLobbyMembers,
  updateLobbyQueue,
} = lobbySlice.actions;
