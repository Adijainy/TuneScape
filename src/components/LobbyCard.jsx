import React from "react";

const LobbyCard = () => {
  return (
    <div className=" w-[10rem] items-center text-center p-4 bg-wine-5 bg-opacity-5 m-4">
      <div className="bg-wine-70">image</div>
      <h3 className="text-2xl my-2">Lobby Name</h3>
      <button className="text-2xl btn-purple">Join lobby</button>
    </div>
  );
};

export default LobbyCard;
