import { apiConnector } from "../apiConnector";
import { lobbyEndpoints } from "../apis";
import { createUser } from "./UserOperation";
import { setUser } from "../../slices/userSlice";

export function createLobby(data, navigate) {
  return async (dispatch) => {
    try {
      const user = await createUser(data);
      console.log("CREATE LOBBY", user);
      dispatch(setUser(user));
      navigate("/createLobby");
    } catch (err) {
      console.log(err);
    }
  };
}

export function joinLobby(data, navigate) {
  return async (dispatch) => {
    try {
      const user = await createUser(data);
      console.log("JOIN LOBBY", user);
      dispatch(setUser(user));
      data.userId = user._id;
      const result = await apiConnector.post(
        lobbyEndpoints.JOIN_LOBBY,
        data,
        null,
        null
      );
      navigate("/lobbyId:" + result.data._id);
    } catch (err) {
      console.log(err);
    }
  };
}
