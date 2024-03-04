import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import songQueue from "../slices/songQueue";

const rootReducer = combineReducers({
  songQueue: songQueue,
  user: userSlice,
});

export default rootReducer;
