import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useRef } from "react";
import { avatars } from "../assets/Avatar";
import { useForm } from "react-hook-form";
import { createLobby, joinLobby } from "../services/apis/LobbyOperation";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { createUser } from "../services/apis/UserOperation";

const LandingPage = () => {
  const nameRef = useRef();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    error,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [joinPublic, setJoinPublic] = useState(false);
  const [avatarSelected, setAvatarSelected] = useState(false);
  const handleScroll = (e, direction) => {
    e.preventDefault();
    if (direction === "left") {
      nameRef.current.scrollLeft -= 80;
    } else {
      nameRef.current.scrollLeft += 80;
    }
  };
  const [active, setActive] = useState("");

  const handleFormSubmit = (data) => {
    if (avatarSelected === false) return;
    data.avatar = active;
    if (joinPublic) {
      data.leader = false;
      handlePublicJoin(data);
      return navigate("/joinPublicLobby");
    } else if (data.lobbyCode === "") {
      //Create Lobby
      data.leader = true;
      dispatch(createLobby(data, navigate));
    } else {
      //Join Lobby
      data.leader = false;
      dispatch(joinLobby(data, navigate));
    }
  };

  const handlePublicJoin = async (data) => {
    const user = await createUser(data);
    dispatch(setUser(user));
  };
  return (
    <div className="relative mt-24 md:mt-16 justify-center flex flex-col ">
      <h1 className="font-Bangers text-7xl md:text-8xl lg:text-[6.5rem] text-wine-25 drop-shadow-[0.3rem_0rem_0.1px_#E4BCDE] lg:drop-shadow-[0.4rem_0rem_0.1px_#E4BCDE] tracking-wider text-center ">
        TuneScape
      </h1>
      <div className="max-w-[90%] md:max-w-[60%] w-[90%] sm:w-[60%] md:w-[75%] text-box mt-6 md:mt-0">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <input
            {...register("username", { required: true })}
            {...(error && { className: "border-red-500" })}
            type="text"
            className="text-field"
            placeholder="Enter your name"
          />
          {errors.username && (
            <p className="text-red-500">This field is required</p>
          )}
          <div className="flex flex-row justify-center items-center bg-wine-50 my-5 py-1">
            <button onClick={(e) => handleScroll(e, "left")}>
              <IoMdArrowDropleft />
            </button>
            <div
              ref={nameRef}
              className="h-16 md:h-24 flex overflow-x-hidden gap-4 px-4 rounded-md"
            >
              {avatars.map((avatar) => (
                <img
                  key={avatar.id}
                  src={avatar.src}
                  alt={avatar.id}
                  className={`avatar-style ${
                    active === avatar.src ? "bg-wine-70" : ""
                  }`}
                  onClick={() => {
                    setActive(avatar.src);
                    setAvatarSelected(true);
                  }}
                />
              ))}
            </div>
            <button onClick={(e) => handleScroll(e, "right")}>
              <IoMdArrowDropright />
            </button>
          </div>
          {!avatarSelected && (
            <p className="text-red-500">Please select an avatar</p>
          )}
          <input
            {...register("lobbyCode")}
            type="text"
            className="text-field mb-4"
            placeholder="Enter lobby code"
          />
          {errors.lobbyCode && (
            <p className="text-red-500">This field is required</p>
          )}
          <button type="submit" className="btn-purple">
            Join Lobby!
          </button>
          <p className=" text-2xl my-1">OR</p>
          {/* <Link to="/createLobby"> */}
          <button type="submit" className="btn-purple">
            Create new Lobby!
          </button>
          {/* </Link> */}
          <p className="text-2xl my-1">OR</p>
          {/* <Link to="/joinPublicLobby"> */}
          <button
            type="submit"
            className="btn-purple"
            onClick={() => setJoinPublic(true)}
          >
            Check out Public Lobby!
          </button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
