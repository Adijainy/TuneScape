import { apiConnector } from "../apiConnector";

import { lobbyEndpoints } from "../apis";
import { createUser } from "./UserOperation";

export async function createLobby(data) {
    try{
        
        const user = await createUser(data);
        console.log("CREATE LOBBY", user);
        return user;
    }catch(err){
        console.log(err);
    }
}

export async function joinLobby(data, navigate){
    try{
        const user = await createUser(data);
        console.log("JOIN LOBBY", user);
        data.userId = user._id;
        const result = await apiConnector.post(lobbyEndpoints.JOIN_LOBBY, data, null, null);
        navigate('/lobby/' + result.data._id);
        return result.data;
    }catch(err){
        console.log(err);
    }
}