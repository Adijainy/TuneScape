import React, { useState, useEffect } from "react";
import VolumeBar from "./VolumeBar";
import SeekBar from "./SeekBar";
import { useSelector } from "react-redux";
import { HiPlayCircle, HiPauseCircle } from "react-icons/hi2";
import { MdOutlineQueueMusic } from "react-icons/md";
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
} from "react-icons/tb";

const Player = ({ audio, song, handlePausePlay, isPlaying }) => {
  const { user } = useSelector((state) => state.user);
  const [volume, setVolume] = useState(0.5);
  const [timeStamp, setTimeStamp] = useState(0);
  useEffect(() => {
    audio.current.ontimeupdate = () => {
      setTimeStamp(audio.current.currentTime);
    };
  }, [timeStamp]);

  useEffect(() => {
    audio.current.volume = volume;
  }, [volume]);
  return (
    <div className="flex flex-col gap-3">
      <div>
        <SeekBar
          max={audio.current?.duration}
          min={0}
          disabled={true}
          value={timeStamp}
        />
      </div>
      <div className="grid grid-cols-3 justify-center items-center">
        <div className="text-wine-5 text-2xl">
          <MdOutlineQueueMusic />
        </div>
        <div>
          {user?.leader && (
            <div className="w-full flex flex-row gap-4 justify-center items-center">
              <button
                className="text-2xl text-wine-5"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <TbPlayerSkipBackFilled />
              </button>
              <button
                className="text-6xl text-wine-5"
                onClick={(e) => {
                  e.preventDefault();
                  handlePausePlay();
                }}
              >
                {isPlaying ? <HiPauseCircle /> : <HiPlayCircle />}
              </button>
              <button
                className="text-2xl text-wine-5"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <TbPlayerSkipForwardFilled />
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <div className="w-3/5">
            <VolumeBar
              value={volume}
              min={0}
              max={1}
              steps={0.01}
              onChange={(e) => {
                e.preventDefault();
                setVolume(e.target.value);
              }}
              setVolume={setVolume}
              disabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;