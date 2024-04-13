import React from "react";
import "./ScrollBar.css";
import { io } from "socket.io-client";
import { useMemo, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { searchSongs, getSongURL } from "../../../services/apis/songs";
import MembersList from "./MembersList";
import { getLobbyInfo } from "../../../services/apis/LobbyOperation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import songDummy from "../../../assets/songDummy.png";
import Player from "./player/Player";
import QueueList from "./QueueList";
import { setIndex } from "../../../slices/lobbySlice";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { leaveLobby } from "../../../services/apis/LobbyOperation";
import { RxCross2 } from "react-icons/rx";

const Lobby = () => {
  const audio = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { lobbyCode } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const socket = useMemo(() => io(`${import.meta.env.VITE_BASE_URL}`), []);
  const [searchSong, setSearchSong] = useState("");
  const [songList, setSongList] = useState([]);
  const [songDetails, setSongDetails] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();
  const [isMemberSlideOpen, setIsMemberSlideOpen] = useState(false);

  //bulding the queue functionality
  const { index } = useSelector((state) => state.lobby);
  const { lobbyQueue } = useSelector((state) => state.lobby);
  const { queueSize } = useSelector((state) => state.lobby);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.emit("joinRoom", lobbyCode);

    socket.on("sendSong", (song) => {
      console.log("song recieved" + song);
      //setSongDetails(song);
      handleUpdateLobby();
    });

    socket.on("startPlay", (data) => {
      console.log("Playing song : " + data);
      audio.current.play();
    });

    socket.on("pauseSong", (data) => {
      console.log("Pausing song : " + data);
      audio.current.pause();
    });

    socket.on("userLeft", (data) => {
      console.log("USER LEFT :", data);
      handleLeaveLobby(data);
    });

    //user joined room event
    socket.on("userJoined", (data) => {
      console.log("User Joined : ", data);
      handleUpdateLobby();
    });
    //next song event
    socket.on("nextSong", (index) => {
      dispatch(setIndex(index + 1));
    });

    //prev song event
    socket.on("prevSong", (index) => {
      dispatch(setIndex(index - 1));
    });

    return () => {
      console.log(socket);
      socket.disconnect();
      //handleLeaveLobby(user._id);
      handleUserLeft();
    };
  }, []);
  // useEffect(() => {
  //   handleSearchSong();
  // }, [searchSong]);
  //song list API call
  async function handleSearchSong() {
    const result = await searchSongs(searchSong);
    setSongList(result);
  }

  //handle click on song
  const handleClickOnSong = async (songData) => {
    const song = {
      songUrl: "",
      songName: songData.name,
      songCover: songData.albumOfTrack.coverArt.sources[0].url,
      album: songData.albumOfTrack.name,
      artist: songData.artists.items[0].profile.name,
      songId: songData.id,
      duration: songData.duration.totalMilliseconds,
      songURI: songData.uri,
      lobbyCode: lobbyCode,
    };
    //check to see if the song is already in the queue
    if (lobbyQueue.find((item) => item.songId === song.songId)) {
      toast.error("Song already in queue");
      return;
    }
    console.log("Selected Song : ", song);
    const result = await getSongURL(song);

    socket.emit("playSong", result, lobbyCode);
    //console.log("Selected Song : ", result);
  };

  //handle song play and pause
  function handleSongPlayPause() {
    if (audio.current.paused) {
      setIsPlaying(true);
      console.log("play");
      socket.emit("songPlay", songDetails);
    } else {
      setIsPlaying(false);
      console.log("pause");
      socket.emit("songPause", songDetails);
    }
  }

  async function handleLeaveLobby(data) {
    if (!data.leader) {
      handleUpdateLobby();
    } else {
      toast.error("Lobby Disbanded!");
      navigate("/");
    }
  }

  function handleUpdateLobby() {
    console.log("Updating lobby");
    dispatch(getLobbyInfo(lobbyCode));
  }

  function handleChangeSong() {
    if (index < queueSize - 1) socket.emit("changeSong", lobbyCode, index);
  }
  function handlePrevSong() {
    console.log("PREV SONG");
    if (index > 0) socket.emit("changeSongPrev", lobbyCode, index);
  }

  async function handleUserLeft() {
    const tempLobbyCode = lobbyCode;
    const tempUser = user;
    console.log("Leaving lobby");
    await dispatch(leaveLobby(user, navigate));
    socket.emit("leaveRoom", tempLobbyCode, tempUser);
  }

  return (
    <div
      className={`w-full h-screen md:h-screen ${
        isMemberSlideOpen ? "overflow-hidden" : "overflow-x-scroll"
      } md:overflow-hidden`}
    >
      <div className="flex flex-col md:flex-row justify-center md:justify-between w-full h-fit md:h-full relative">
        {/* Show members */}
        <div
          className={`block h-screen w-full md:w-[20rem] md:h-full absolute top-0 left-0 ${
            isMemberSlideOpen
              ? "translate-x-0"
              : "-translate-x-[600px] md:translate-x-0"
          } z-50 md:static md:block transition-all duration-300 ease-in`}
        >
          <MembersList
            socket={socket}
            handleCloseSlide={() => setIsMemberSlideOpen(false)}
          />
        </div>
        <div className="block md:hidden text-wine-5 absolute top-4 left-4 text-4xl">
          <button onClick={() => setIsMemberSlideOpen(true)}>
            <RiMenuUnfoldLine />
          </button>
        </div>

        <button
          className="visible md:invisible btn-purple w-fit absolute top-4 right-4 text-wine-5 py-1 px-4 rounded-lg"
          onClick={() => handleUserLeft()}
        >
          <span className="text-3xl tracking-wider font-Jomhuria ">
            Leave Lobby
          </span>
        </button>

        {/* songDetails */}
        <div className="mx-auto h-full min-h-screen my-auto rounded-3xl flex flex-col items-center justify-evenly max-w-[90%] md:min-w-[37rem]">
          <h1 className="block md:hidden font-Bangers text-7xl md:text-8xl lg:text-[6.5rem] text-wine-25 drop-shadow-[0.3rem_0rem_0.1px_#E4BCDE] lg:drop-shadow-[0.4rem_0rem_0.1px_#E4BCDE] tracking-wider text-center ">
            TuneScape
          </h1>
          {/* Song Card  */}
          <div className=" bg-wine-70 bg-opacity-60 backdrop-blur-sm rounded-lg p-2 pb-3 w-fit max-w-64">
            <div className="flex flex-col justify-center gap-0 items-center">
              <div className="p-2 rounded-lg">
                <img
                  src={
                    lobbyQueue[index]?.songCover
                      ? lobbyQueue[index]?.songCover
                      : songDummy
                  }
                  alt={`This is song album for ${lobbyQueue[index]?.songName}`}
                  width={200}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="">
                <h1 className="text-3xl text-wine-5 text-center font-Bangers tracking-widest line-clamp-1">
                  {lobbyQueue[index]?.songName
                    ? lobbyQueue[index]?.songName
                    : "Starting soon..."}
                </h1>
                <p className="text-lg text-wine-5 font-semibold text-center">
                  {lobbyQueue[index]?.artist}
                </p>
              </div>
            </div>
          </div>
          {/* Player  */}
          <div className=" mb-0 bg-wine-50 bg-opacity-80 backdrop-blur-sm p-4 rounded-lg w-full">
            <Player
              audio={audio}
              song={lobbyQueue[index]}
              handlePausePlay={() => handleSongPlayPause()}
              handleChangeSong={() => handleChangeSong()}
              handlePrevSong={() => handlePrevSong()}
              isPlaying={isPlaying}
            />

            <audio
              ref={audio}
              src={lobbyQueue[index]?.songUrl}
              autoPlay
              onEnded={(e) => {
                e.preventDefault();
                if (user?.leader) {
                  handleChangeSong();
                }
              }}
            />
          </div>
        </div>
        {/* songList */}
        <div
          className={`h-screen max-h-[100vh] w-full md:max-w-[20rem] bg-wine-70 p-6 md:border-l-2 border-wine-20 grid grid-cols-1 ${
            user?.leader ? " grid-rows-2" : "grid-rows-1"
          }`}
        >
          {/* Search Song Here  */}
          {user?.leader && (
            <div className="flex flex-col items-center">
              <h1 className="text-center text-[2.6rem] text-wine-5 font-Jomhuria tracking-wider">
                Search Song Here
              </h1>
              {/* Search Container  */}
              <div className="flex flex-row justify-center items-center mb-3 w-full relative">
                <input
                  type="text"
                  placeholder="Search Song Here"
                  value={searchSong}
                  onChange={(e) => setSearchSong(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault(); // Prevent form submission
                      handleSearchSong();
                    }
                  }}
                  className="border-2 border-wine-30 bg-wine-70 text-wine-5  py-2 px-5 md:py-3 pr-6 w-full rounded-l-full placeholder:text-wine-20"
                />
                <button
                  onClick={() => handleSearchSong()}
                  className="rounded-r-full border-2 border-wine-30 bg-wine-70 text-wine-20 py-2 px-5 md:py-3 text-2xl transition-all duration-150 hover:bg-wine-30 hover:text-wine-5"
                >
                  <IoSearch />
                </button>
                <button
                  className="absolute top-4 right-[4.7rem] text-wine-20 font-bold text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchSong("");
                  }}
                >
                  <RxCross2 />
                </button>
              </div>
              {/* Song List  */}

              {songList?.length > 0 && (
                <div
                  id="scrollBar"
                  className="bg-[#411831] p-3 flex flex-col gap-1 rounded-xl w-full  h-4/5 border-[1px] border-wine-20 overflow-y-scroll"
                >
                  {songList.map((song) => (
                    <div
                      key={song.data.id}
                      onClick={() => handleClickOnSong(song.data)}
                      className="flex gap-3 transition-all duration-150 hover:bg-[#811B60] p-1 rounded-md cursor-pointer"
                    >
                      <div>
                        <img
                          src={song.data.albumOfTrack.coverArt.sources[0].url}
                          alt={`cover at of ${song.data.name}`}
                          className="w-[35px] md:w-[30px] md:h-[30px] rounded"
                        />
                      </div>
                      <div className="w-4/5">
                        <h1 className="text-white text-sm md:text-xs line-clamp-1">
                          {song.data.name}
                        </h1>
                        <p className="text-gray-400 text-[12px] md:text-[10px]">
                          {song.data.artists.items[0].profile.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Queue */}
          <div className=" h-full">
            <h1 className="text-center text-[2.7rem] text-wine-5 font-Jomhuria tracking-wider">
              Song Queue
            </h1>
            {<QueueList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
