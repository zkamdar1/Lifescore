"use client";

import React, { useEffect, useState } from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Sidebar from "../Components/SideBar/Sidebar";
import { useGlobalContextProvider } from "../contextApi";
import { menuItemType } from "../Types/MenuItemType";
import Tags from "../Pages/Tags/Tags";
import AllHabits from "../Pages/AllHabits/AllHabits";
import Statistics from "../Pages/Statistics/Statistics";

function Dashboard() {
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
        <div className="flex">
            <Sidebar />
            {selectComponent}
        </div>
    );
}

export default Dashboard;
