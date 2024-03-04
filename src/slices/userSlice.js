import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    lobbyCode: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    setLobbyCode: (state, action) => {
      state.lobbyCode = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { addUser, setLobbyCode } = userSlice.actions;
