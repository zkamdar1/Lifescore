import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, IconButton } from "@mui/material";
import React from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { defaultColor, darkModeColor } from "@/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { HabitType } from "@/src/app/Types/GlobalTypes";

export default function ContainerMiddle() {
  const { allHabitsObject } = useGlobalContextProvider();
  const { allHabits } = allHabitsObject;

    return (
      <div className="p-3">
        {allHabits.map((singleHabit, singleHabitIndex) => (
          <div key={singleHabitIndex}>
            <HabitCard singleHabit={singleHabit} />
          </div>
        ))}
      </div>
    );

  function HabitCard({ singleHabit }: { singleHabit: HabitType}) {
      const { darkModeObject } = useGlobalContextProvider();
      const { isDarkMode } = darkModeObject;
        return (
          <div className="flex p-3 items-center justify-between">
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              sx={{
                color: defaultColor.default,
                "&.Mui-checked": {
                  color: defaultColor.default,
                },
              }}
            />

            <div
              style={{
                backgroundColor: isDarkMode
                  ? darkModeColor.backgroundSlate
                  : defaultColor.backgroundSlate,
              }}
              className="flex justify-between gap-2 w-full p-3 py-4 rounded-lg"
            >
              <div className="w-full">
                {/* Divs for icon & name of habit */}
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-2 items-center">
                    <FontAwesomeIcon
                      className="p-3 rounded-full w-4 h-4 bg-customRed text-white"
                      height={20}
                      width={20}
                      icon={singleHabit.icon}
                    />
                    <span className="">{singleHabit.name}</span>
                  </div>
                </div>
                {/* Divs for the tags */}
                <div className="flex gap-2 mt-3">
                  {singleHabit.areas.map((singleArea, index) => (
                    <div
                      key={index}
                      style={{
                        color: isDarkMode
                          ? darkModeColor.textColor
                          : defaultColor.default,
                        backgroundColor: isDarkMode
                          ? defaultColor[50]
                          : defaultColor[100],
                      }}
                      className="p-1 text-[12px] rounded-md px-2"
                    >
                      <span className="">{singleArea.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Div for three dot button */}
              <div className="w-10 flex item-center justify-center">
                <IconButton>
                  <MoreVertIcon sx={{ color: isDarkMode ? "white" : "gray" }} />
                </IconButton>
              </div>
            </div>
          </div>
        );
    }
}
