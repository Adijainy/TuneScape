import React from "react";
import { useEffect, useState } from "react";
const CreateLobby = () => {
  const [lobbyCode, setLobbyCode] = useState("");
  useEffect(()=>{
    setLobbyCode(generateUniqueCode(6));
  },[])

  function generateUniqueCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
       
        
    }
    return code;
}

  return (
    <>
      <div className="relative h-screen w-2/6 flex items-center justify-center">
        <div className="text-box ">
          <h1 className="text-4xl">Create New Lobby</h1>
          <input
            type="text"
            className="text-field"
            placeholder="Enter lobby name"
          />
          <h2 className="my-2">Lobby Code</h2>
          <input
            type="text"
            className="text-field"
            placeholder="lobby code will be here"
            value = {lobbyCode}
            disabled
          />
          <p className="text-2xl my-1">OR</p>
          <button className="bg-[#411831] border-4 border-[#811B60] p-1 w-full tracking-wider mb-4 hover:bg-[#811B60]">
            Copy URL
          </button>
          <button className="btn-purple">Create Lobby!</button>
        </div>
      </div>
    </>
  );
};

export default CreateLobby;
