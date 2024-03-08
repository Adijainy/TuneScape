import React, {useState, useEffect} from "react";
import LobbyCard from "./LobbyCard";
import { getPublicLobby } from "../services/apis/LobbyOperation";
import { useNavigate } from "react-router-dom";

const JoinPublicLobby = () => {
  const[lobbies, setLobbies] = useState([]);
  useEffect(() => {
    // Fetch public lobbies
    getLobbies();
  }, []);
  async function getLobbies(){
    const result = await getPublicLobby();
    setLobbies(result);
  }
  return (
    <div className="relative h-screen w-2/3  flex flex-col items-center justify-center">
      <div className="text-box bg-opacity-75 backdrop-blur-sm">
        <h1>Public Lobbies!</h1>
        <div className="flex flex-wrap">
          {
            lobbies.map((lobby)=>(
              <LobbyCard key={lobby._id} lobby={lobby} onCli/>
              
            
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default JoinPublicLobby;
