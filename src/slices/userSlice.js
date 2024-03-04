import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  lobbyCode: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLobbyCode: (state, action) => {
      state.lobbyCode = action.payload;
    },
  },
});

export const { setUser, setLobbyCode } = userSlice.actions;
export default userSlice.reducer;
