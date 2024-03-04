import { apiConnector } from "../apiConnector";
import { lobbyEndpoints } from "../apis";
import { createUser } from "./UserOperation";
import { setLobbyCode, setUser } from "../../slices/userSlice";

export function createLobby(data, navigate) {
  return async (dispatch) => {
    try {
      const user = await createUser(data);
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
      dispatch(setUser(user));
      data.userId = user._id;
      const result = await apiConnector(
        "POST",
        lobbyEndpoints.JOIN_LOBBY,
        data,
        null,
        null
      );
      navigate("/lobbyId/" + result.data.updateLobby.code);
    } catch (err) {
      console.log(err);
    }
  };
}

export function nowCreateLobby(data, navigate) {
  return async (dispatch) => {
    try {
      const result = await apiConnector(
        "POST",
        lobbyEndpoints.CREATE_LOBBY,
        data,
        null,
        null
      );
      dispatch(setLobbyCode(result.data.updateLobby.code));
      navigate("/lobbyId/" + result.data.updateLobby.code);
    } catch (err) {
      console.log(err);
    }
  };
}
