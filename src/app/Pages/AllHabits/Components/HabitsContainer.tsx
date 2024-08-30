import React from "react";
import ContainterTop from "./HabitsContainer/ContainerTop";
import ContainerMiddle from "./HabitsContainer/ContainterMiddle";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
import DropDown from "@/src/app/Dropdown";


function HabitsContainer() {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode, setDarkMode, darkModeItems, setDarkModeItems } =
        darkModeObject;
    
    return (
      <div
        style={{
          color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
          backgroundColor: isDarkMode
            ? darkModeColor.background
            : defaultColor.background,
        }}
        className="mt-5 rounded-md p-5 flex flex-col gap-3"
      >
        <ContainterTop />
        <ContainerMiddle />
      </div>
    );
}

export default HabitsContainer;
