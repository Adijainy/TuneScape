import React, { useState, useEffect } from "react";
import LobbyCard from "./LobbyCard";
import { getPublicLobby } from "../services/apis/LobbyOperation";
import { useNavigate } from "react-router-dom";
import "./core/lobby/ScrollBar.css";

const JoinPublicLobby = () => {
  const [lobbies, setLobbies] = useState([]);
  useEffect(() => {
    // Fetch public lobbies
    getLobbies();
  }, []);
  async function getLobbies() {
    const result = await getPublicLobby();
    setLobbies(result);
  }
  
  return (
    <div className="relative h-screen w-4/5 md:w-2/3  flex flex-col items-center justify-center">
      <div className="text-box h-4/5 md:h-fit bg-opacity-75 backdrop-blur-sm my-8 md:my-0">
        <h1 className=" text-2xl md:text-4xl font-Bangers">Public Lobbies!</h1>
        <div
          id="scrollBar"
          className="flex flex-wrap gap-2 overflow-y-scroll h-[90%]  md:h-fit justify-center"
        >
          {lobbies.map((lobby) => (
            <LobbyCard key={lobby._id} lobby={lobby} onCli />
          ))}

          {
            lobbies.length == 0 && (
              <div>
                <p className="font-Jomhuria text-4xl text-wine-5">So silent here...</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default JoinPublicLobby;
