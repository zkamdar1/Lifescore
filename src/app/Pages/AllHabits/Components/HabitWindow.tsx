"use client";

import { useGlobalContextProvider } from "@/src/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
import { faClose, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import IconWindow from "./IconsWindow/IconWindow";
import { icon, IconProp } from "@fortawesome/fontawesome-svg-core";

type HabitType = {
    _id: string;
    name: string;
    icon: IconProp;
};


function HabitWindow() {
    const { habitWindowObject, darkModeObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;
    const [ habitItem, setHabitItem ] = useState<HabitType>({
        _id: "",
        name: "",
        icon: faQuestion,
    });
    const [openIconWindow, setOpenIconWindow] = useState<boolean>(false);
    const [iconSelected, setIconSelected] = useState<IconProp>(habitItem.icon);

    const onUpdateHabitName = (inputText: string) => {
        const copyHabitItem = { ...habitItem };
        copyHabitItem.name = inputText;
        setHabitItem(copyHabitItem);
    };

    useEffect(() => {
        const copyHabitItem = { ...habitItem };
        copyHabitItem.icon = iconSelected;
        setHabitItem(copyHabitItem);
    }, [iconSelected]);

    return (
        <div
            style={{
                backgroundColor: isDarkMode ? darkModeColor.background: "white", color: isDarkMode ? darkModeColor.textColor: "black",
            }}
            className={`top-[3%] left-1/2 transform -translate-x-1/2 w-[80%] z-50 p-10 rounded-md shadow-md ${openHabitWindow ? "absolute" : "hidden"}`}
        >
            <IconWindow
                openIconWindow={openIconWindow}
                setOpenIconWindow={setOpenIconWindow}
                iconSelected={iconSelected}
                setIconSelected={setIconSelected}
            />
            <Header />
            <InputNameAndIconButton
                onUpdateHabitName={onUpdateHabitName}
                habitName={habitItem.name}
                setOpenIconWindow={setOpenIconWindow}
                iconSelected={iconSelected}
            />
            <SaveButton habit={habitItem} />
        </div>
    );
}

export default HabitWindow;

function Header() {
    const { habitWindowObject } = useGlobalContextProvider();
    const { setOpenHabitWindow } = habitWindowObject;

    return (
        <div className="flex justify-between items-center">
            <span className="font-bold text-xl">Add New Habit</span>
            <FontAwesomeIcon
                onClick={() => setOpenHabitWindow(false)}
                className="text-gray-400 cursor-pointer"
                icon={faClose}
            />
        </div>
    );
}

function InputNameAndIconButton({
    onUpdateHabitName,
    habitName,
    setOpenIconWindow,
    iconSelected,
}: {
        onUpdateHabitName: (inputText: string) => void;
        habitName: string;
        setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
        iconSelected: IconProp;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { habitWindowObject, darkModeObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;

    function updateInputHabit(event: React.ChangeEvent<HTMLInputElement>) {
        onUpdateHabitName(event.target.value);
    }

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 500);

        if (!openHabitWindow) {
            onUpdateHabitName("");
        }
    }, [openHabitWindow]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [iconSelected]);

    return (
        <div className="flex flex-col gap-2 mt-10 px-3">
            <span className="opacity-80 font-semibold">Habit Name</span>
            <div className="flex gap-4 justify-between items-center">
                <input
                    style={{
                        backgroundColor: isDarkMode ? darkModeColor.background: "white",
                    }}
                    ref={inputRef}
                    value={habitName}
                    onChange={(event) => updateInputHabit(event)}
                    className={`border w-full border-gray-200 outline-none p-4 rounded-md text-[13px]`}
                    placeholder="Enter a name for the habit..."
                />

                <FontAwesomeIcon
                    onClick={() => setOpenIconWindow(true)}
                    className="mt-[1px] p-4 rounded-md text-white cursor-pointer bg-customRed"
                    icon={iconSelected}
                    height={16}
                    width={20}
                />
            </div>
        </div>
    );
}

function SaveButton({ habit }: { habit: HabitType }) {
    return (
        <div className="w-full flex justify-center mt-9">
            <button
                onClick={() => {
                    console.log(habit);
                }}
                className="bg-customRed p-4 w-[98%] rounded-md text-white"
            >
                Add a Habit
            </button>
        </div>
    );
}
