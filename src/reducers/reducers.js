import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import songQueue from "../slices/songQueue";
import lobbySlice from "../slices/lobbySlice";

const rootReducer = combineReducers({
  songQueue: songQueue,
  user: userSlice,
  lobby: lobbySlice,
});

export default rootReducer;
