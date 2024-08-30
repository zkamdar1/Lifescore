"use client";

import React, { useEffect, useState } from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Sidebar from "../Components/SideBar/Sidebar";
import { useGlobalContextProvider } from "../contextApi";
import { menuItemType } from "../Types/MenuItemType";
import Tags from "../Pages/Tags/Tags";
import AllHabits from "../Pages/AllHabits/AllHabits";
import Statistics from "../Pages/Statistics/Statistics";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { defaultColor, darkModeColor } from "@/colors";


function Dashboard() {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { menuItemObject } = useGlobalContextProvider();
    const { menuItems } = menuItemObject;
    const [selectedMenu, setSelectedMenu] = useState<menuItemType | null>(null);
    let selectComponent = null;

    useEffect(() => {
        menuItems.map((singleItem) => {
            if (singleItem.isSelected) {
                setSelectedMenu(singleItem);
            }
        });
    }, [menuItems]);

    switch (selectedMenu?.name) {
        case "All Habits":
            selectComponent = <AllHabits />
            break;
        case "Statistics":
            selectComponent = <Statistics />
            break;
        case "Tags":
            selectComponent = <Tags />
            break;
    }

    return (
      <div
        style={{
          backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
        }}
        className="flex"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Sidebar />
          {selectComponent}
          <BlackSoftLayer />
        </LocalizationProvider>
      </div>
    );
}

export default Dashboard;

function BlackSoftLayer() {
    const { openSideBarObject, habitWindowObject, openConfirmationWindowObject } = useGlobalContextProvider();
  const { openSideBar } = openSideBarObject;
  const { openConfirmationWindow } = openConfirmationWindowObject;
  const { openHabitWindow } = habitWindowObject;
    return (
        <div
            className={`w-full h-full bg-black fixed top-0 left-0 opacity-20 z-40 ${openSideBar || openHabitWindow || openConfirmationWindow ? "fixed" : "hidden"}`}
        >
        </div>
    );
}
