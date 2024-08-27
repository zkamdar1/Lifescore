import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { defaultColor, darkModeColor } from "@/colors";

function Calendar() {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    return (
      <div
        style={{
          backgroundColor: isDarkMode
            ? darkModeColor.backgroundSlate
            : defaultColor.backgroundSlate,
        }}
        className="flex mx-4 flex-col gap-6 justify-center items-center mt-10 rounded-xl p-5 pt-7"
      >
        <DateCalendar
          sx={{
            "& .MuiPickersDay-root": {
              color: isDarkMode
                ? darkModeColor.textColor
                : defaultColor.textColor,
            },
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: `${defaultColor.default} !important`, 
              color: "white !important",
              "&:hover": {
                backgroundColor: `${defaultColor[50]} !important`, 
              },
            },
            "& .MuiPickersYear-yearButton": {
              color: isDarkMode
                ? darkModeColor.textColor
                : defaultColor.textColor,
            },
            "& .MuiPickersYear-yearButton.Mui-selected": {
              backgroundColor: `${defaultColor.default} !important`, 
              color: "white !important", 
              "&:hover": {
                backgroundColor: `${defaultColor[50]} !important`, 
              },
            },
          }}
        />
      </div>
    );
}

export default Calendar;
