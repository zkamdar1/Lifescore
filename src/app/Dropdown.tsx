import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "./contextApi";

interface dropMenuItem {
    name: string,
    icon: IconProp
}

function DropDown() {
    const { darkModeObject, openDropDownObject, dropDownPositionsObject, openConfirmationWindowObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { openConfirmationWindow, setOpenConfirmationWindow } = openConfirmationWindowObject;
    const { openDropDown, setOpenDropDown } = openDropDownObject;
    const { dropDownPositions, setDropDownPositions } = dropDownPositionsObject;
    const ref = useRef<HTMLDivElement>(null);
    const dropDownMenuItems: dropMenuItem[] = [
        { name: "Edit", icon: faPencil },
        { name: "Delete", icon: faTrash },
    ];

    const [hover, setHover] = useState(false);
    const [indexHovered, setIndexHovered] = useState(0);

    function handleHoverChanged(index: number, state: boolean) {
        setIndexHovered(index);
        setHover(state);
    }

    function handleClickedOpen(index: number) {
        switch (index) {
            case 0:
                console.log("edit");

                break;
            case 1:
                setOpenConfirmationWindow(true);
                setOpenDropDown(false)

                break;
            default:
                break;
        }
    }

    useEffect(() => {
        function handleOutsideClicked(event: MouseEvent) {
            if (ref && !ref.current?.contains(event.target as Node)) {
                setOpenDropDown(false);
            }
        }

        document.addEventListener("click", handleOutsideClicked);
        return () => {
            document.removeEventListener("click", handleOutsideClicked);
        };
    }, [openDropDown]);

    return (
        <div
            ref={ref}
            style={{
                left: dropDownPositions.left - 135,
                top: dropDownPositions.top + 40,
                backgroundColor: isDarkMode
                    ? darkModeColor.background
                    : defaultColor.background
            }}
            className={`p-3 w-40 fixed z-[60] shadow-md flex rounded-lg flex-col gap-3 text-[11px] top-11 left-1/3 ${openDropDown ? "block" : "hidden"}`}
        >
            {dropDownMenuItems.map((menuItem, index) => (
                <div
                    style={{
                        backgroundColor: 
                            hover && index === indexHovered ? defaultColor.default : "",
                          color: hover && index === indexHovered ? "#ffffff" : "",
                    }}
                    key={index}
                    onMouseEnter={() => handleHoverChanged(index, true)}
                    onMouseLeave={() => handleHoverChanged(index, false)}
                    className={`flex gap-2 items-center rounded-md p-3 select-none cursor-pointer transition-all`}
                    onClick={() => handleClickedOpen(index)}
                >
                    <FontAwesomeIcon
                        style={{
                          color: hover && index === indexHovered ? "#ffffff" : defaultColor.default,
                        }}
                        className="size-4"
                        icon={menuItem.icon}
                    />
                    <div
                        style={{
                            color: hover && index === indexHovered
                                ? "#ffffff"
                                : !isDarkMode
                                ? "black"
                                : "white",
                        }}
                        className={` }`}
                    >
                        {menuItem.name}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DropDown;
