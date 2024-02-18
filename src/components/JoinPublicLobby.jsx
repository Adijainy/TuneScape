import React from "react";
import LobbyCard from "./LobbyCard";

const JoinPublicLobby = () => {
  return (
    <div className="relative h-screen w-2/3  flex flex-col items-center justify-center">
      <div className="text-box bg-opacity-75">
        <h1>Public Lobbies!</h1>
        <div className="flex flex-wrap">
          <LobbyCard />
          <LobbyCard />
          <LobbyCard />
          <LobbyCard />
          <LobbyCard />
          <LobbyCard />
          <LobbyCard />
        </div>
      </div>
    </div>
  );
};

export default JoinPublicLobby;
