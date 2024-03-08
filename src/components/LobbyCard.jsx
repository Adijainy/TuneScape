import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinPublicLobby } from "../services/apis/LobbyOperation";

const LobbyCard = ({lobby}) => {
  const {user} = useSelector((state) => state.user);
  console.log("USER IN PUBLIC CAARD : ", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnClick=()=>{
    const data = {
      lobbyCode: lobby.code,
      userId: user._id
    }
    dispatch(joinPublicLobby(data, navigate));

  }
  return (
    <div className=" w-[10rem] items-center text-center p-4 bg-wine-5 bg-opacity-5 m-4">
      <div className="bg-wine-70">{lobby?.leader?.avatar}</div>
      <h3 className="text-2xl my-2">{lobby?.name}</h3>
      <button className="text-2xl btn-purple" onClick={handleOnClick}>Join Lobby</button>
    </div>
  );
};

export default LobbyCard;
