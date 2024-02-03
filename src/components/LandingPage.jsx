import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative mt-16 justify-center">
      <h1 className="font-Bangers text-9xl text-[#943a82] drop-shadow-[0.4rem_0rem_0.1px_#E4BCDE] tracking-wider">
        TuneScape
      </h1>
      <div className="w-[85%] text-box">
        <input
          type="text"
          className="text-field"
          placeholder="Enter your name"
        />
        <div className="bg-[#562546] p-1 h-24 my-4">
          <h3 className="font-Jomhuria text-white text-3xl">
            avatars will be here
          </h3>
        </div>
        <input
          type="text"
          className="text-field mb-4"
          placeholder="Enter lobby code"
        />
        <button className="btn-purple">Join Lobby!</button>
        <p className=" text-2xl my-1">OR</p>
        <Link to="/createLobby">
          <button className="btn-purple">Create new Lobby!</button>
        </Link>
        <p className="text-2xl my-1">OR</p>
        <button className="btn-purple">Check out Public Lobby!</button>
      </div>
    </div>
  );
};

export default LandingPage;
