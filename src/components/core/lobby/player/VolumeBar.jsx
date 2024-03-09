import React from "react";
import "./Slider.css";

import { ImVolumeMedium, ImVolumeLow, ImVolumeMute2 } from "react-icons/im";
const VolumeBar = ({
  value,
  min,
  max,
  onChange,
  steps,
  disabled,
  setVolume,
}) => {
  return (
    <div className="flex gap-2 items-center">
      {value == 0 && (
        <ImVolumeMute2
          className="text-wine-5 text-4xl md:text-2xl cursor-pointer"
          onClick={() => setVolume(0.5)}
        />
      )}
      {value > 0 && value < 0.6 && (
        <ImVolumeLow
          className="text-wine-5 text-4xl md:text-2xl cursor-pointer"
          onClick={() => setVolume(0)}
        />
      )}
      {value >= 0.6 && (
        <ImVolumeMedium
          className="text-wine-5 text-4xl md:text-2xl cursor-pointer"
          onClick={() => setVolume(0)}
        />
      )}
      <input
        type="range"
        value={value}
        min={min}
        step={steps}
        max={max}
        onChange={onChange}
        className="bg-wine-70 appearance-none rounded-full text-wine-5 h-fit"
        disabled={disabled}
      />
    </div>
  );
};

export default VolumeBar;
