import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinPublicLobby } from "../services/apis/LobbyOperation";

const LobbyCard = ({ lobby }) => {
  const { user } = useSelector((state) => state.user);
  console.log("USER IN PUBLIC CAARD : ", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnClick = () => {
    const data = {
      lobbyCode: lobby.code,
      userId: user._id,
    };
    dispatch(joinPublicLobby(data, navigate));
  };
  return (
    <div className=" w-[80%] sm:w-[10rem] items-center justify-center flex flex-col gap-1 text-center p-4 bg-wine-5 bg-opacity-5">
      <div className="bg-wine-70 p-2 w-fit rounded-lg">
        <img
          src={lobby?.leader?.avatar}
          alt="leader-avatar"
          className=" w-14 md:w-20"
        />
      </div>
      <h3 className="text-lg md:text-2xl line-clamp-1">{lobby?.name}</h3>
      <button
        className=" text-lg md:text-2xl btn-purple"
        onClick={handleOnClick}
      >
        Join Lobby
      </button>
    </div>
  );
};

export default LobbyCard;
