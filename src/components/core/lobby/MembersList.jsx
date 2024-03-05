import React from "react";
import { useEffect } from "react";
import { getLobbyMembers } from "../../../services/apis/LobbyOperation";
import { useSelector } from "react-redux";

const MembersList = (data) => {
  const lobbyCode = useSelector((state) => state.user.lobbyCode);
  console.log(lobbyCode);
  useEffect(() => {
    // const formData = new FormData();
    // formData.append("lobbyCode", lobbyCode);
    const req = { lobbyCode: lobbyCode };
    const res = getLobbyMembers(req); //hello copilot how are you?
    console.log(res);
  });
  return <div>lobby members</div>;
};

export default MembersList;
