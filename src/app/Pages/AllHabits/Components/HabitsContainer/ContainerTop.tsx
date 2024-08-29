import React, { useEffect } from "react";
import { faP, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { getCurrentDayName, getDateString, getFormattedDate } from "@/src/app/utils/allHabitsUtils/DateFunction";

export default function ContainterTop() {
  const { habitWindowObject, selectedCurrentDayObject, offsetDayObject } = useGlobalContextProvider();
  const { openHabitWindow, setOpenHabitWindow } = habitWindowObject;
  const { selectedCurrentDate, setSelectedCurrentDate } = selectedCurrentDayObject;
  const { offsetDay, setOffsetDay } = offsetDayObject;

  type Option = "next" | "prev";
  function updateDate(option: Option) {
    if (option === "next") {
      setOffsetDay((prev) => prev + 1)
    }

    if (option === "prev") {
      setOffsetDay((prev) => prev - 1)
    }
  }

  useEffect(() => {
    console.log(offsetDay);

    setSelectedCurrentDate(getDateString(new Date(), offsetDay));
  }, [offsetDay]);

  console.log(selectedCurrentDate);

  function openHabitWindowFunction() {
    setOpenHabitWindow(!openHabitWindow);
  } 

    return (
      <div className="p-3 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <h2
              className="font-bold text-lg w-28"
            >
              {getCurrentDayName(selectedCurrentDate)}
            </h2>
            <span
              className="font-light text-[12px]"
            >
              {getFormattedDate(selectedCurrentDate)}
            </span>
          </div>
          {/* */}
          <div className="flex gap-1 m1-4">
            <div
              onClick={() => updateDate("prev")}
              className="text-customRed cursor-pointer"
            >
              <ArrowCircleLeftOutlinedIcon />
            </div>

            <div
              onClick={() => updateDate("next")}
              className="text-customRed cursor-pointer"
            >
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
