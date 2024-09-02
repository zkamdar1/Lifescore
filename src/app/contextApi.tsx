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
    faCoffee,
    faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { AreaType, HabitType } from "./Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { iconToText, textToIcon } from "./Pages/AllHabits/Components/IconsWindow/IconData";
import { getDateString } from "./utils/allHabitsUtils/DateFunction";
import { v4 as uuidv4 } from "uuid"; 
import { useUser } from "@clerk/nextjs";

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
    selectedCurrentDayObject: {
        selectedCurrentDate: "",
        setSelectedCurrentDate: () => {},
    },
    offsetDayObject: {
        offsetDay: 0,
        setOffsetDay: () => {},
    },
    selectedTagStringObject: {
        selectedTagString: "",
        setSelectedTagString: () => {},
    },
    allFilteredHabitsObject: {
        allFilteredHabits: [],
        setAllFilteredHabits: () => {},
    },
    openDropDownObject: {
        openDropDown: false,
        setOpenDropDown: () => {},
    },
    dropDownPositionsObject: {
        dropDownPositions: {
            top: 0,
            left: 0,
        },
        setDropDownPositions: () => {},
    },
    openConfirmationWindowObject: {
        openConfirmationWindow: false,
        setOpenConfirmationWindow: () => {},
    },
    selectedItemsObject: {
        selectedItems: null,
        setSelectedItems: () => {},
    },
    openAreaFormObject: {
        openAreaForm: false,
        setOpenAreaForm: () => {},
    },
    openIconWindowObject: {
        openIconWindow: false,
        setOpenIconWindow: () => {},
        iconSelected: faCoffee,
        setIconSelected: () => {},
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

    const [allAreas, setAllAreas] = useState<AreaType[]>([]);

    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);
    const [openTimePickerWindow, setOpenTimePickerWindow] = useState<boolean>(false);
    const [selectedCurrentDate, setSelectedCurrentDate] = useState(() => getDateString(new Date()));
    const [offsetDay, setOffsetDay] = useState(0);
    const [selectedTagString, setSelectedTagString] = useState<string>("All");
    const [allFilteredHabits, setAllFilteredHabits] = useState<HabitType[]>([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [dropDownPositions, setDropDownPositions] = useState({
        top: 0,
        left: 0,
    });
    const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
    const [selectedItems, setSelectedItems] = useState<HabitType | AreaType | null>(null);
    const { isLoaded, isSignedIn, user } = useUser();
    const [openAreaForm, setOpenAreaForm] = useState(false);
    const[openIconWindow, setOpenIconWindow] = useState(false);
    const [iconSelected, setIconSelected] = useState<IconProp>(faCoffee);

    useEffect(() => {
        const fetchAllHabits = async () => {
            try {
                const response = await fetch(`/api/habits?clerkId=${user?.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch habits");
                }
                const data: { habits: HabitType[] } = await response.json();

                const updatedHabits = data.habits.map((habit: HabitType) => {
                    if (typeof habit.icon === "string") {
                        return {
                            ...habit,
                            icon: textToIcon(habit.icon) as IconProp,
                        };
                    }
                    return habit;
                });

                const updatedHabitsWithAreas = updatedHabits.map((habit: HabitType) => {
                    const updatedAreas = habit.areas.map((area: AreaType) => {
                        if (typeof area.icon === "string") {
                            return {
                                ...area,
                                icon: textToIcon(area.icon) as IconProp,
                            };
                        }
                        return area;
                    });
                    return { ...habit, areas: updatedAreas };
                });

                console.log(updatedHabitsWithAreas);

                setAllHabits(updatedHabitsWithAreas);
            } catch (error) {
                console.error("Error fetching habits:", error);
            }
        };
        
        async function fetchAllAreas() {
            try {
              const response = await fetch(`/api/areas?clerkId=${user?.id}`);
              if (!response.ok) {
                throw new Error("Failed to fetch tags");
              }
              const data: { areas: AreaType[] } = await response.json();

              if (data.areas.length === 0) {
                const allAreas = await addTheAllArea();

                if (typeof allAreas?.icon === "string") {
                  const updatedAreas = {
                    ...allAreas,
                    icon: textToIcon(allAreas.icon) as IconProp,
                  };

                  setAllAreas([updatedAreas]);
                }
                return;
              }

              const updatedAreas = data.areas.map((area: AreaType) => {
                if (typeof area.icon === "string") {
                  return {
                    ...area,
                    icon: textToIcon(area.icon) as IconProp,
                  };
                }
                return area;
              });
                
              setAllAreas(updatedAreas);
            } catch (error) { }
        } 
        
        if (isLoaded && isSignedIn) {
            fetchAllHabits();
            fetchAllAreas();
        }
    }, [isLoaded, isSignedIn, user?.id]);

    async function addTheAllArea() {
        const allArea = {
            icon: iconToText(faGlobe),
            name: "All",
            clerkUserId: user?.id as string,
        };

        try {
            const response = await fetch("/api/areas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "applications/json",
                    },

                    body: JSON.stringify(allArea),
            });

            if (!response.ok) {
                throw new Error("Failed to add habit")
            }

            const data = await response.json();
            const { _id } = data.area;

            const updatedIdOfArea = { ...allArea, _id: _id };

            return updatedIdOfArea;
        } catch (error) {}
    };

    useEffect(() => {
        setOpenSideBar(false);
        setOpenAreaForm(false);
        setOpenConfirmationWindow(false);
        setOpenHabitWindow(false);
    }, [menuItems]);

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
                selectedCurrentDayObject: {
                    selectedCurrentDate,
                    setSelectedCurrentDate,
                },
                offsetDayObject: {
                    offsetDay,
                    setOffsetDay,
                },
                selectedTagStringObject: {
                    selectedTagString,
                    setSelectedTagString,
                },
                allFilteredHabitsObject: {
                    allFilteredHabits,
                    setAllFilteredHabits,
                },
                openDropDownObject: {
                    openDropDown,
                    setOpenDropDown,
                },
                dropDownPositionsObject: {
                    dropDownPositions,
                    setDropDownPositions,
                },
                openConfirmationWindowObject: {
                    openConfirmationWindow,
                    setOpenConfirmationWindow,
                },
                selectedItemsObject: {
                    selectedItems,
                    setSelectedItems,
                },
                openAreaFormObject: {
                    openAreaForm,
                    setOpenAreaForm,
                },
                openIconWindowObject: {
                    openIconWindow,
                    setIconSelected,
                    iconSelected,
                    setOpenIconWindow,
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
