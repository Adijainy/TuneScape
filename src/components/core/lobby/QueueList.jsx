import React from "react";
import { useSelector } from "react-redux";

const QueueList = () => {
  const { lobbyQueue } = useSelector((state) => state.lobby);
  const { index } = useSelector((state) => state.lobby);
  return (
    <div
      id="scrollBar"
      className="bg-[#411831] p-3 flex flex-col gap-1 rounded-xl w-full h-4/5 border-[1px] border-wine-20 overflow-y-scroll"
    >
      {lobbyQueue.map((song, indexSong) => {
        return (
          <div
            key={song.songId}
            className={`flex gap-3 transition-all duration-150 p-1 rounded-md ${
              indexSong === index && "bg-wine-20"
            }`}
          >
            <div className="">
              <img
                src={song.songCover}
                alt={`cover at of ${song.songName}`}
                className="w-[35px] md:w-[30px] md:h-[30px] object-cover rounded"
              />
            </div>
            <div className="w-4/5">
              <h1 className="text-white text-sm md:text-xs line-clamp-1">
                {song.songName}
              </h1>
              <p className="text-gray-400 text-[12px] md:text-[10px]">{song.artist}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QueueList;
