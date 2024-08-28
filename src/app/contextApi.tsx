"use client";

import { ReactNode, createContext, useState, useContext } from "react";
import { GlobalContextType } from "./Types/GlobalContextType";
import { menuItemType } from "./Types/MenuItemType";
import { DarkModeItem } from "./Types/DarkModeTypes";
import {
    faRectangleList,
    faChartSimple,
    faLayerGroup,
    faSun,
    faMoon,
} from "@fortawesome/free-solid-svg-icons";

const GlobalContext = createContext<GlobalContextType>({
    menuItemObject: {
        menuItems: [],
        setMenuItems: () => {},
    },
    openSideBarObject: {
        openSideBar: false,
        setOpenSideBar: () => {},
    },
    darkModeObject: {
        isDarkMode: false,
        setDarkMode: () => {},
        darkModeItems: [],
        setDarkModeItems: () => {},
    },
    habitWindowObject: {
        openHabitWindow: false,
        setOpenHabitWindow: () => {},
    },
    openTimePickerObject: {
        openTimePickerWindow: false,
        setOpenTimePickerWindow: () => {},
    },
});

function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [menuItems, setMenuItems] = useState<menuItemType[]>([
        { name: "All Habits", isSelected: true, icon: faRectangleList },
        { name: "Statistics", isSelected: false, icon: faChartSimple },
        { name: "Tags", isSelected: false, icon: faLayerGroup },
    ]);

    const [darkModeItems, setDarkModeItems] = useState<DarkModeItem[]>([
        { id: 1, icon: faSun, isSelected: true },
        { id: 2, icon: faMoon, isSelected: false },
    ]);

    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);
    const [openTimePickerWindow, setOpenTimePickerWindow] = useState<boolean>(false);

    return (
        <GlobalContext.Provider
            value={{
                menuItemObject: { menuItems, setMenuItems },
                openSideBarObject: { openSideBar, setOpenSideBar },
                darkModeObject: { isDarkMode, setDarkMode, darkModeItems, setDarkModeItems },
                habitWindowObject: {
                    openHabitWindow,
                    setOpenHabitWindow,
                },
                openTimePickerObject: {
                    openTimePickerWindow,
                    setOpenTimePickerWindow,
                },
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContextProvider() {
    return useContext(GlobalContext);
}

export default GlobalContextProvider;
