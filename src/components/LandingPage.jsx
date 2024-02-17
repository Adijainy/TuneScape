import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar1 from "./../assets/avatar-1.png";
import avatar2 from "./../assets/avatar-2.png";
import avatar3 from "./../assets/avatar-3.png";
import avatar4 from "./../assets/avatar-4.png";
import avatar5 from "./../assets/avatar-5.png";
import avatar6 from "./../assets/avatar-6.png";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useRef } from "react";

const LandingPage = () => {
  const nameRef = useRef();
  const handleScroll = (direction) => {
    if (direction === "left") {
      nameRef.current.scrollLeft -= 80;
    } else {
      nameRef.current.scrollLeft += 80;
    }
  };
  const [active, setActive] = useState("");
  return (
    <div className="relative mt-16 justify-center flex flex-col ">
      <h1 className="font-Bangers text-9xl text-[#943a82] drop-shadow-[0.4rem_0rem_0.1px_#E4BCDE] tracking-wider text-center">
        TuneScape
      </h1>
      <div className="max-w-[60%] w-[80%] text-box">
        <input
          type="text"
          className="text-field"
          placeholder="Enter your name"
        />
        <div className="flex flex-row justify-center items-center bg-[#562546] my-5 py-1">
          <button onClick={() => handleScroll("left")}>
            <IoMdArrowDropleft />
          </button>
          <div
            ref={nameRef}
            className="h-24 flex overflow-x-hidden gap-5 px-4 rounded-md"
          >
            <img
              src={avatar1}
              alt="avatar1"
              className={`avatar-style ${active != "" ? "bg-[#411831]" : ""}`}
              onClick={() => setActive("bg-[#411831]")}
            />
            <img src={avatar2} alt="avatar3" className="avatar-style" />
            <img src={avatar3} alt="avatar3" className="avatar-style" />
            <img src={avatar4} alt="avatar4" className="avatar-style" />
            <img src={avatar5} alt="avatar5" className="avatar-style" />
            <img src={avatar6} alt="avatar6" className="avatar-style" />
          </div>
          <button onClick={() => handleScroll("right")}>
            <IoMdArrowDropright />
          </button>
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
