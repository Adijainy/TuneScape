import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useRef } from "react";
import { avatars } from "../assets/Avatar";

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
            {
              avatars.map((avatar)=>(
                <img
                  key = {avatar.id}
                  src={avatar.src}
                  alt= {avatar.id}
                  className={`avatar-style ${active === avatar.id? "bg-[#411831]" : ""}`}
                  onClick={() => setActive(avatar.id)}
                />
            
              ))
            }
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
