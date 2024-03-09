import { createSlice } from "@reduxjs/toolkit";

const lobbySlice = createSlice({
  name: "lobby",
  initialState: {
    lobbyID: localStorage.getItem("lobbyID")
      ? JSON.parse(localStorage.getItem("lobbyID"))
      : null,
    lobbyCode: localStorage.getItem("lobbyCode")
      ? JSON.parse(localStorage.getItem("lobbyCode"))
      : null,
    lobbyMembers: localStorage.getItem("lobbyMembers")
      ? JSON.parse(localStorage.getItem("lobbyMembers"))
      : [],
    lobbyQueue: localStorage.getItem("lobbyQueue")
      ? JSON.parse(localStorage.getItem("lobbyQueue"))
      : [],
    index: 0,
    lobbyName: localStorage.getItem("lobbyName")
      ? JSON.parse(localStorage.getItem("lobbyName"))
      : null,
      queueSize: 0,
  },
  reducers: {
    setLobbyInfo: (state, action) => {
      state.lobbyID = action.payload._id;
      state.lobbyCode = action.payload.code;
      state.lobbyMembers = action.payload.members;
      state.lobbyQueue = action.payload.queue;
      state.lobbyName = action.payload.name;
      state.queueSize = action.payload.queue.length;
    },
    updateLobbyQueue: (state, action) => {
      state.lobbyQueue = action.payload;
    },
    updateLobbyMembers: (state, action) => {
      state.lobbyMembers = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export default lobbySlice.reducer;
export const {
  setLobbyInfo,
  updateLobbyMembers,
  updateLobbyQueue,
  setIndex,
} = lobbySlice.actions;
