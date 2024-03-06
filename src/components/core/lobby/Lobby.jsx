import React from "react";
import { io } from "socket.io-client";
import { useMemo, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { searchSongs, getSongURL } from "../../../services/apis/songs";
import {
  HiSpeakerWave,
  HiSpeakerXMark,
  HiPlayCircle,
  HiPauseCircle,
} from "react-icons/hi2";
import MembersList from "./MembersList";
import { getLobbyInfo } from "../../../services/apis/LobbyOperation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const audio = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { lobbyCode } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const socket = useMemo(() => io(`${import.meta.env.VITE_BASE_URL}`), []);
  const [songUrl, setSongUrl] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [songList, setSongList] = useState([]);
  const [songDetails, setSongDetails] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.emit("joinRoom", lobbyCode);

    socket.on("sendSong", (song) => {
      console.log("song recieved" + song);
      setSongUrl(song.songUrl);
      setSongDetails(song);
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
      handleLeaveLobby(data);
    });

    return () => {
      console.log(socket);
      socket.disconnect();
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
    const result = await getSongURL(songData.id);
    const song = {
      songUrl: result.url,
      songName: songData.name,
      songCover: songData.albumOfTrack.coverArt.sources[0].url,
      ablum: songData.albumOfTrack.name,
      artist: songData.artists.items[0].profile.name,
      songId: songData.id,
      duration: songData.duration.totalMilliseconds,
      songURI: songData.uri,
    };
    socket.emit("playSong", song, lobbyCode);
    console.log("Selected Song : ", song);
  };
  //handle mute unmute
  function handleMuteUnmute() {
    if (isMuted) {
      audio.current.muted = false;
      setIsMuted(false);
    } else {
      audio.current.muted = true;
      setIsMuted(true);
    }
  }

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
      navigate("/");
    }
  }

  async function handleUpdateLobby() {
    console.log("Updating lobby");
    dispatch(getLobbyInfo(lobbyCode));
  }

  return (
    <div className="w-full h-screen">
      <div className="flex flex-row justify-between w-full h-full">
        {/* Show members */}
        <div>
          <MembersList socket={socket} />
        </div>
        {/* songDetails */}
        <div className="h-fit my-auto bg-wine-50 bg-opacity-80 p-8 rounded-3xl">
          <div>
            {songDetails?.songName && (
              <div className="flex flex-row gap-5 items-center">
                <div>
                  <img
                    src={songDetails?.songCover}
                    alt={`This is song album for ${songDetails?.songName}`}
                    width={100}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-wine-5">
                    {songDetails?.songName}
                  </h1>
                  <p className="text-lg text-wine-5 font-semibold">
                    {songDetails?.artist}
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Player  */}
          <div>
            {/* Buttons  */}
            <div className="flex items-baseline mt-2">
              {
                <button
                  onClick={() => handleMuteUnmute()}
                  className="text-wine-5 text-xl"
                >
                  {isMuted ? <HiSpeakerXMark /> : <HiSpeakerWave />}
                </button>
              }
              {user?.leader && (
                <div>
                  <button
                    onClick={() => handleSongPlayPause()}
                    className="text-wine-5 text-xl"
                  >
                    {isPlaying && <HiPauseCircle />}
                    {!isPlaying && <HiPlayCircle />}
                  </button>
                </div>
              )}
            </div>
            <audio
              ref={audio}
              src={songUrl}
              controls={user?.leader ? true : false}
              autoPlay
            />
          </div>
        </div>
        {/* songList */}
        <div className="h-full w-[370px] bg-wine-70 p-8 border-l-2 border-wine-20 grid grid-cols-1 grid-rows-2">
          {/* Queue */}
          <div>
            <h1 className="text-center text-5xl text-wine-5 font-Jomhuria tracking-wider">
              Song Queue
            </h1>
            {
              //Show Song queue here
            }
          </div>
          {/* Search Song Here  */}
          {user?.leader && (
            <div className="flex flex-col gap-2">
              <h1 className="text-center text-5xl text-wine-5 font-Jomhuria tracking-wider">
                Search Song Here
              </h1>
              {/* Search Container  */}
              <div className="flex flex-row justify-center items-center">
                <input
                  type="text"
                  placeholder="Search Song Here"
                  value={searchSong}
                  onChange={(e) => setSearchSong(e.target.value)}
                  className="border-2 border-wine-30 bg-wine-70 text-wine-5 px-5 py-3 rounded-l-full placeholder:text-wine-20"
                />
                <button
                  onClick={() => handleSearchSong()}
                  className="rounded-r-full border-2 border-wine-30 bg-wine-70 text-wine-20 px-5 py-3 text-2xl transition-all duration-150 hover:bg-wine-30 hover:text-wine-5"
                >
                  <IoSearch />
                </button>
              </div>
              {/* Song List  */}

              {songList?.length > 0 && (
                <div className="bg-[#411831] p-3 flex flex-col gap-1 rounded-xl w-[300px] h-4/5 border-[1px] border-wine-20 overflow-y-scroll">
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
                          className="w-[30px] h-[30px] rounded"
                        />
                      </div>
                      <div>
                        <h1 className="text-white text-xs line-clamp-1">
                          {song.data.name}
                        </h1>
                        <p className="text-gray-400 text-[10px]">
                          {song.data.artists.items[0].profile.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
