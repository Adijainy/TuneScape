import { apiConnector } from "../apiConnector";
import { lobbyEndpoints } from "../apis";
import { createUser } from "./UserOperation";
import { setLobbyCode, setUser } from "../../slices/userSlice";
import { setLobbyInfo } from "../../slices/lobbySlice";

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
      dispatch(setLobbyInfo(result.data.updateLobby));
      dispatch(setLobbyCode(result.data.updateLobby.code));
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
      console.log("CREATE LOBBY RESPONSE: ", result.data);
      dispatch(setLobbyInfo(result.data.updateLobby));
      dispatch(setLobbyCode(result.data.updateLobby.code));
      navigate("/lobbyId/" + result.data.updateLobby.code);
    } catch (err) {
      console.log(err);
    }
  };
}

export async function getLobbyMembers(data) {
  try {
    console.log("data", data);
    const result = await apiConnector(
      "GET",
      lobbyEndpoints.GET_LOBBY_MEMBERS,
      JSON.stringify(data),
      null,
      null
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

export function leaveLobby(data, navigate) {
  return async (dispatch) => {
    try {
      console.log("Leave Lobby", data);
      const url = data.leader
        ? lobbyEndpoints.LEAVE_LOBBY_LEADER
        : lobbyEndpoints.LEAVE_LOBBY_MEMBER;
      const method = data.leader ? "DELETE" : "PUT";
      const result = await apiConnector(
        `${method}`,
        url,
        { userId: data._id },
        null,
        null
      );
      dispatch(setUser({}));
      dispatch(setLobbyInfo({}));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
}

export function getLobbyInfo(data) {
  return async (dispatch) => {
    try {
      const result = await apiConnector(
        "GET",
        `${lobbyEndpoints.GET_LOBBY_INFO}${data}`,
        null,
        null,
        null
      );
      console.log("GET LOBBY INFO RESPONSE : ", result.data.data);
      dispatch(setLobbyInfo(result.data.data));
    } catch (err) {
      console.log(err);
    }
  };
}
