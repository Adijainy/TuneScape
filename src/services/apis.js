const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

//USER ENDPOINTS
export const endpoints = {
  CREATE_USER: `${BASE_URL}/user`,
};

//LOBBY ENDPOINTS
export const lobbyEndpoints = {
  CREATE_LOBBY: `${BASE_URL}/lobby/create`,
  JOIN_LOBBY: `${BASE_URL}/lobby/join`,
  LEAVE_LOBBY_MEMBER: `${BASE_URL}/lobby/leave/member`,
  LEAVE_LOBBY_LEADER: `${BASE_URL}/lobby/leave/leader`,
  GET_PUBLIC_LOBBIES: `${BASE_URL}/lobby/public`,
  GET_LOBBY_MEMBERS: `${BASE_URL}/lobby/members`,
  GET_LOBBY_INFO: `${BASE_URL}/lobby/get=`,
};
