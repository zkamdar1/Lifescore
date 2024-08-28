import React from "react";
import { faP, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useGlobalContextProvider } from "@/src/app/contextApi";

export default function ContainterTop() {
  const { habitWindowObject } = useGlobalContextProvider();
  const { openHabitWindow, setOpenHabitWindow } = habitWindowObject;

  function openHabitWindowFunction() {
    setOpenHabitWindow(!openHabitWindow);
  } 

    return (
      <div className="p-3 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <h2 className="font-bold text-lg">Sunday</h2>
            <span className="font-light text-[12px]">17 May 2024</span>
          </div>
          {/* */}
          <div className="flex gap-1 m1-4">
            <div className="text-customRed cursor-pointer">
              <ArrowCircleLeftOutlinedIcon />
            </div>

            <div className="text-customRed cursor-pointer">
              <ArrowCircleRightOutlinedIcon />
            </div>
          </div>
          {/* */}
            </div>
            <button
                onClick={openHabitWindowFunction}
                className="flex gap-2 items-center bg-customRed p-3 text-white rounded-md text-sm"
                
            >
                <FontAwesomeIcon icon={faPlus} />
                <span>New Habit</span>
            </button>
      </div>
    );
}
