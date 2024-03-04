import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SwitchButton from "./core/SwitchButton";
const CreateLobby = () => {
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
    data.lobbyCode = lobbyCode;
    console.log(data);
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
            {...register("lobbyName", { required: true })}
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
          <button className="bg-[#411831] border-4 border-[#811B60] p-1 w-full tracking-wider mb-4 hover:bg-[#811B60]">
            Copy URL
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
