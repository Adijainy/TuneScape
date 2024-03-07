import React from "react";
import { useSelector } from "react-redux";

const QueueList = () => {
  const { lobbyQueue } = useSelector((state) => state.lobby);
  return (
    <div
      id="scrollBar"
      className="bg-[#411831] p-3 flex flex-col gap-1 rounded-xl w-[280px] h-4/5 border-[1px] border-wine-20 border-r-0 overflow-y-scroll"
    >
      {lobbyQueue.map((song) => {
        return (
          <div
            key={song.songId}
            className="flex gap-3 transition-all duration-150 hover:bg-[#811B60] p-1 rounded-md cursor-pointer"
          >
            <div>
              <img
                src={song.songCover}
                alt={`cover at of ${song.songName}`}
                className="w-[30px] h-[30px] rounded"
              />
            </div>
            <div>
              <h1 className="text-white text-xs line-clamp-1">
                {song.songName}
              </h1>
              <p className="text-gray-400 text-[10px]">{song.artist}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QueueList;
