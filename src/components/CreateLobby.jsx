import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SwitchButton from "./core/SwitchButton";
import { useDispatch, useSelector } from "react-redux";
import { nowCreateLobby } from "../services/apis/LobbyOperation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const CreateLobby = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lobbyCode, setLobbyCode] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    setLobbyCode(generateUniqueCode(6));
  }, []);

  // Function to generate a unique code
  function generateUniqueCode(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  }

  const handleFormSubmit = (data) => {
    data.leader = user._id;
    data.code = lobbyCode;
    dispatch(nowCreateLobby(data, navigate));
    reset();
  };

  return (
    <>
      <div className="relative h-screen w-2/6 flex items-center justify-center">
        <form
          className="text-box relative"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h1 className="text-4xl">Create New Lobby</h1>
          <div className="absolute top-5 right-6">
            <SwitchButton setValue={setValue} />
          </div>
          <input
            type="text"
            className="text-field"
            placeholder="Enter lobby name"
            {...register("name", { required: true })}
          />
          {errors.lobbyName && (
            <p className="text-red-500 text-base">This field is required</p>
          )}
          <h2 className="my-2">Lobby Code</h2>
          <input
            type="text"
            className="text-field"
            placeholder="lobby code will be here"
            value={lobbyCode}
            disabled
          />
          <p className="text-2xl my-1">OR</p>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(`${lobbyCode}`);
              toast.success("Lobby Code Copied!", {
                style: {
                  backgroundColor: "#411831",
                  color: " #E4BCDE",
                  fontWeight: "bold",
                },
                iconTheme: {
                  primary: "#E4BCDE",
                  secondary: "#411831",
                },
              });
            }}
            className="bg-[#411831] border-4 border-[#811B60] w-full tracking-wider mb-4 hover:bg-[#811B60]"
          >
            Copy Lobby Code
          </button>
          <button className="btn-purple" type="submit">
            Create Lobby!
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateLobby;
