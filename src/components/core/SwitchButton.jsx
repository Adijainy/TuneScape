import React, { useEffect, useState } from "react";
import { MdLockOpen, MdLockOutline } from "react-icons/md";

const SwitchButton = ({ setValue }) => {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setValue("isPrivate", isLocked);
  }, []);

  const toggleLock = (e) => {
    e.preventDefault();
    setValue("isPrivate", !isLocked);
    setIsLocked(!isLocked);
  };
  return (
    <div>
      <button
        type="button"
        onClick={(e) => toggleLock(e)}
        className="border-2 md:border-4 border-wine-30 flex gap-[4px] md:gap-[6px] p-0 md:p-1 rounded-full relative"
      >
        <div
          className={`text-base z-10 transition-all duration-300 ${
            isLocked && "opacity-0"
          }`}
        >
          <MdLockOpen />
        </div>
        <div
          className={`text-base z-10 transition-all duration-300 ${
            !isLocked && "opacity-0"
          }`}
        >
          <MdLockOutline />
        </div>
        <div
          className={`p-[8px] md:p-[10px] bg-wine-30 rounded-full  transition-all duration-300 absolute top-[0px] md:top-[3px] left-0 md:left-[2px] ${
            isLocked ? "translate-x-[22px]" : "translate-x-0"
          } z-0`}
        ></div>
      </button>
    </div>
  );
};

export default SwitchButton;
