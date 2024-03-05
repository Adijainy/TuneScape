import React from "react";
import { io } from "socket.io-client";
import { useMemo, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { searchSongs, getSongURL } from "../../../services/apis/songs";

const Lobby = () => {
  const { user } = useSelector((state) => state.user);
  const { lobbyCode } = useSelector((state) => state.user);

  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [songUrl, setSongUrl] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("sendSong", (songurl) => {
      console.log("song recieved" + songurl);
      setSongUrl(songurl);
    });

    socket.on("startPlay", (data) => {
      console.log("Playing song : " + data);
      audio.current.play();
    });

    socket.on("pauseSong", (data) => {
      console.log("Pausing song : " + data);
      audio.current.pause();
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
    console.log("Selected Song : ", song);
  };

  return (
    <div>
      <div>
        {/* Show members */}
        <div></div>
        {/* songDetails */}
        <div></div>
        {/* songList */}
        <div>
          {/* Queue */}
          <div></div>
          {/* Search Song Here  */}
          {user?.leader && (
            <div>
              {/* Search Container  */}
              <div className="flex flex-row justify-center items-center">
                <input
                  type="text"
                  placeholder="Search Song Here"
                  value={searchSong}
                  onChange={(e) => setSearchSong(e.target.value)}
                  className="border-2 border-wine-30 bg-wine-70 text-wine-5 px-5 py-3 rounded-l-full"
                />
                <button
                  onClick={() => handleSearchSong()}
                  className="rounded-r-full border-2 border-wine-30 bg-wine-70 text-wine-20 px-5 py-3 text-2xl transition-all duration-150 hover:bg-wine-30 hover:text-wine-5"
                >
                  <IoSearch />
                </button>
              </div>
              {/* Song List  */}

              {songList.length > 0 && (
                <div className="bg-[#411831] p-3 flex flex-col gap-1 rounded-xl w-[300px]">
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
