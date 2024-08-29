import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { defaultColor, darkModeColor } from "@/colors";
import dayjs, { Dayjs } from "dayjs";

function Calendar() {
    const { darkModeObject, selectedCurrentDayObject, offsetDayObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const {selectedCurrentDate } = selectedCurrentDayObject;
    const { setOffsetDay } = offsetDayObject;
    
    const value: Dayjs | null = selectedCurrentDate
      ? dayjs(selectedCurrentDate)
      : null;
  
    function handleOnChangeDate(newDate: Dayjs) {
      const jsDate = newDate.toDate();
      const currentDate = new Date();

      const differenceInMs = jsDate.getTime() - currentDate.getTime();
      const differenceInDays = differenceInMs / (1000 * 3600 * 24);

      setOffsetDay(Math.floor(differenceInDays + 1))
    }
  
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
          onChange={handleOnChangeDate}
          value={value}
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
