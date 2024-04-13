import { apiConnector } from "../apiConnector";
import { lobbyEndpoints } from "../apis";
import { createUser } from "./UserOperation";
import { setLobbyCode, setUser } from "../../slices/userSlice";
import { setLobbyInfo, setIndex } from "../../slices/lobbySlice";
import { toast } from "react-hot-toast";

export function createLobby(data, navigate) {
  return async (dispatch) => {
    try {
      const toastId = toast.loading("Creating Lobby...");
      const user = await createUser(data);
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/createLobby");
      toast.dismiss(toastId);
    } catch (err) {
      console.log(err);
      toast.error("Error Creating Lobby, ", err.message);
    }
  };
}

export function joinLobby(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Joining Lobby...");
    try {
      const user = await createUser(data);
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      data.userId = user._id;
      const result = await apiConnector(
        "POST",
        lobbyEndpoints.JOIN_LOBBY,
        data,
        null,
        null
      ).catch((err) => {
        console.log("ERROR JOINING LOBBY : ", err.response.data.message);
        toast.error(err.response.data.message);
        toast.dismiss(toastId);
      });
      if (result.status !== 201) {
        toast.error("Error Joining Lobby, ", result.data.message);
        return;
      }
      dispatch(setLobbyInfo(result.data.updateLobby));
      localStorage.setItem(
        "lobbyID",
        JSON.stringify(result.data.updateLobby._id)
      );
      localStorage.setItem(
        "lobbyMembers",
        JSON.stringify(result.data.updateLobby.members)
      );
      localStorage.setItem(
        "lobbyQueue",
        JSON.stringify(result.data.updateLobby.queue)
      );
      dispatch(setLobbyCode(result.data.updateLobby.code));
      localStorage.setItem(
        "lobbyCode",
        JSON.stringify(result.data.updateLobby.code)
      );
      dispatch(setIndex(0));
      navigate("/lobbyId/" + result.data.updateLobby.code);
      toast.success("Lobby Joined!");
      toast.dismiss(toastId);
    } catch (err) {
      console.log(err);
    }
  };
}

export function nowCreateLobby(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating Lobby...");
    try {
      const result = await apiConnector(
        "POST",
        lobbyEndpoints.CREATE_LOBBY,
        data,
        null,
        null
      ).catch((err) => {
        console.log("ERROR CREATING LOBBY : ", err.response.data.message);
        toast.error(err.response.data.message);
        toast.dismiss(toastId);
      });
      console.log("CREATE LOBBY RESPONSE: ", result.data);
      dispatch(setLobbyInfo(result.data.updateLobby));
      dispatch(setIndex(0));
      localStorage.setItem(
        "lobbyID",
        JSON.stringify(result.data.updateLobby._id)
      );
      localStorage.setItem(
        "lobbyMembers",
        JSON.stringify(result.data.updateLobby.members)
      );
      localStorage.setItem(
        "lobbyQueue",
        JSON.stringify(result.data.updateLobby.queue)
      );
      dispatch(setLobbyCode(result.data.updateLobby.code));
      navigate("/lobbyId/" + result.data.updateLobby.code);
      toast.success("Lobby Created!");
      toast.dismiss(toastId);
    } catch (err) {
      console.log(err);
      toast.error("Error Creating Lobby, ", err.message);
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
    ).catch((err) => {
      console.log("ERROR GETTING LOBBY MEMBERS : ", err.response.data.message);
      toast.error(err.response.data.message);
    });
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
      ).catch((err) => {
        console.log("ERROR LEAVING LOBBY : ", err.response.data.message);
        //toast.error(err.response.data.message);
      });
      dispatch(setUser({}));
      localStorage.clear();
      if (!data.leader) {
        toast.success("Lobby Left!");
        navigate("/");
      }
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
      ).catch((err) => {
        console.log("ERROR GETTING LOBBY INFO : ", err.response.data.message);
        toast.error(err.response.data.message);
      });
      console.log("GET LOBBY INFO RESPONSE : ", result.data.data);
      dispatch(setLobbyInfo(result.data.data));
    } catch (err) {
      console.log(err);
    }
  };
}

export async function getPublicLobby() {
  const toastId = toast.loading("Fetching Public Lobbies...");
  try {
    const result = await apiConnector(
      "GET",
      lobbyEndpoints.GET_PUBLIC_LOBBIES,
      null,
      null,
      null
    ).catch((err) => {
      console.log("ERROR GETTING PUBLIC LOBBIES : ", err.response.data.message);
      toast.error(err.response.data.message);
      toast.dismiss(toastId);
    });
    toast.success("Public Lobbies Fetched!");
    toast.dismiss(toastId);
    return result.data;
  } catch (err) {
    console.log(err);
    toast.error("Error Fetching Public Lobbies, ", err.message);
  }
}
export function joinPublicLobby(data, navigate) {
  return async (dispatch) => {
    try {
      const toastId = toast.loading("Joining Lobby...");
      console.log("JOIN PUBLIC LOBBY DATA : ", data);
      const result = await apiConnector(
        "POST",
        lobbyEndpoints.JOIN_LOBBY,
        data,
        null,
        null
      ).catch((err) => {
        console.log("ERROR JOINING PUBLIC LOBBY : ", err.response.data.message);
        toast.error(err.response.data.message);
        toast.dismiss(toastId);
      });
      dispatch(setLobbyInfo(result.data.updateLobby));
      localStorage.setItem(
        "lobbyID",
        JSON.stringify(result.data.updateLobby._id)
      );
      localStorage.setItem(
        "lobbyMembers",
        JSON.stringify(result.data.updateLobby.members)
      );
      localStorage.setItem(
        "lobbyQueue",
        JSON.stringify(result.data.updateLobby.queue)
      );
      dispatch(setLobbyCode(result.data.updateLobby.code));
      localStorage.setItem(
        "lobbyCode",
        JSON.stringify(result.data.updateLobby.code)
      );
      dispatch(setIndex(0));
      navigate("/lobbyId/" + result.data.updateLobby.code);
      toast.success("Lobby Joined!");
      toast.dismiss(toastId);
    } catch (err) {
      console.log(err);
      toast.error("Error Joining Lobby, ", err.message);
    }
  };
}
