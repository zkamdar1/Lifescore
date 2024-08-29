"use client";

import { ReactNode, createContext, useState, useContext, useEffect } from "react";
import { GlobalContextType } from "./Types/GlobalContextType";
import { menuItemType } from "./Types/MenuItemType";
import { DarkModeItem } from "./Types/DarkModeTypes";
import {
    faRectangleList,
    faChartSimple,
    faLayerGroup,
    faSun,
    faMoon,
    faUsers,
    faGraduationCap,
    faCode,
} from "@fortawesome/free-solid-svg-icons";
import { AreaType, HabitType } from "./Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { textToIcon } from "./Pages/AllHabits/Components/IconsWindow/IconData";

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
    allAreasObject: {
        allAreas: [],
        setAllAreas: () => {},
    },
    allHabitsObject: {
        allHabits: [],
        setAllHabits: () => {},
    },
});

function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [menuItems, setMenuItems] = useState<menuItemType[]>([
        { name: "All Habits", isSelected: true, icon: faRectangleList },
        { name: "Statistics", isSelected: false, icon: faChartSimple },
        { name: "Tags", isSelected: false, icon: faLayerGroup },
    ]);

    const [allHabits, setAllHabits] = useState<HabitType[]>([]);

    const [darkModeItems, setDarkModeItems] = useState<DarkModeItem[]>([
        { id: 1, icon: faSun, isSelected: true },
        { id: 2, icon: faMoon, isSelected: false },
    ]);

    const [allAreas, setAllAreas] = useState<AreaType[]>([
        { id: 1, icon: faUsers, name: "All" },
        { id: 2, icon: faGraduationCap, name: "Study" },
        { id: 3, icon: faCode, name: "Code" },
    ]);

    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);
    const [openTimePickerWindow, setOpenTimePickerWindow] = useState<boolean>(false);

    useEffect(() => {
        function fetchData() {
            const allHabitsData = [
                {
                    _id: "",
                    name: "",
                    icon: textToIcon("faTools") as IconProp,
                    frequency: [{ type: "Daily", days: ["M"], number: 1 }],
                    notificationTime: "",
                    isNotificationOn: false,
                    areas: [],
                },
            ];

            setTimeout(() => {
                setAllHabits(allHabitsData);
            }, 1000);
        }
        fetchData();
    }, []);

    console.log(allHabits);

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
                allAreasObject: {
                    allAreas,
                    setAllAreas,
                },
                allHabitsObject: {
                    allHabits,
                    setAllHabits,
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
