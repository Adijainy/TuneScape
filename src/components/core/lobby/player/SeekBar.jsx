import React from "react";

const SeekBar = ({ max = 0, min, disabled, value }) => {
  return (
    <div>
      <div className="text-wine-5 w-full flex flex-row justify-between">
        <p>{`${Math.floor(value / 60)}:${
          value % 60 <= 10
            ? `0${Math.floor(value % 60)}`
            : Math.floor(value % 60)
        }`}</p>
        <p>{`${Math.floor(max / 60)}:${
          max % 60 < 10 ? `0${Math.floor(max % 60)}` : Math.floor(max % 60)
        }`}</p>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        className="bg-wine-70 appearance-none rounded-full text-wine-5 h-fit cursor-default w-full"
        disabled={disabled}
      />
    </div>
  );
};

export default SeekBar;
