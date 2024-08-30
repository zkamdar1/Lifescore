import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { defaultColor, darkModeColor } from "@/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { HabitType } from "@/src/app/Types/GlobalTypes";
import { v4 as uuidv4 } from "uuid";
import convertIconsToTextOfHabits from "@/src/app/utils/allHabitsUtils/editHabits";


function HabitCard({ singleHabit }: { singleHabit: HabitType }) {
    const { darkModeObject, allHabitsObject, selectedCurrentDayObject, openDropDownObject, dropDownPositionsObject, selectedItemsObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { setSelectedItems } = selectedItemsObject;
    const { allHabits, setAllHabits} = allHabitsObject;
    const { selectedCurrentDate } = selectedCurrentDayObject;
    const { setOpenDropDown } = openDropDownObject;
    const { setDropDownPositions } = dropDownPositionsObject;
    
    const [checked, setChecked] = useState(
    singleHabit.completedDays.some((day) => day.date === selectedCurrentDate)
    );

    function handleClickedCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    setChecked(checked);

    if (checked) {
        checkHabit();
    } else {
        uncheckTheHabit();
    }
    }

    function checkHabit() {
        const completedDay = {
            _id: uuidv4(),
            date: selectedCurrentDate,
        };

        const updatedHabits: HabitType = {
            ...singleHabit,
            completedDays: [...singleHabit.completedDays, completedDay],
        };

        const habitToUpdateInServer = convertIconsToTextOfHabits(updatedHabits);
        editTheHabitInServer(habitToUpdateInServer);

        const updateAllHabits: HabitType[] = allHabits.map((habit) => {
            if (habit._id === updatedHabits._id) {
            return updatedHabits;
            } else {
            return habit;
            }
        });
        setAllHabits(updateAllHabits);
    }

    function uncheckTheHabit() {
        const updatedHabits: HabitType = {
            ...singleHabit,
            completedDays: singleHabit.completedDays.filter(
            (day) => day.date !== selectedCurrentDate
            ),
        };

        const habitToUpdateInServer = convertIconsToTextOfHabits(updatedHabits);
        editTheHabitInServer(habitToUpdateInServer);

        const updateAllHabits: HabitType[] = allHabits.map((habit) => {
            if (habit._id === updatedHabits._id) {
                return updatedHabits;
            } else {
                return habit;
            }
            });
            setAllHabits(updateAllHabits);
    }

    function handleClickThreeDots(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const top = rect.top;
        const left = rect.left;
        setDropDownPositions({ top, left });

        event.stopPropagation();
        setOpenDropDown(true);
        setSelectedItems(singleHabit);
    }

    useEffect(() => {
        const isCompleted = singleHabit.completedDays.some(
            (day) => day.date === selectedCurrentDate
        );
        setChecked(isCompleted);
    }, [singleHabit, selectedCurrentDate, allHabits]);

    return (
        <div className="flex p-3 items-center justify-between">
            <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                checked={checked}
                onChange={handleClickedCheckbox}
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
                <IconButton onClick={handleClickThreeDots}>
                    <MoreVertIcon  sx={{ color: isDarkMode ? "white" : "gray" }} />
                </IconButton>
                </div>
            </div>
        </div>
    );
}

export default HabitCard;

async function editTheHabitInServer(habit: HabitType) {
    const response = await fetch(`api/habits?habitId=${habit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: habit.name,
          icon: habit.icon,
          areas: habit.areas,
          frequency: habit.frequency,
          notificationTime: habit.notificationTime,
          isNotificationOn: habit.isNotificationOn,
          completedDays: habit.completedDays,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to edit habit");
    }
}