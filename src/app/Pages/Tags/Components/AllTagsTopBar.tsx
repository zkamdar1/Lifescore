import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "@/Button";

function TagsTopBar() {
    const {
        openSideBarObject,
        darkModeObject: { isDarkMode },
        openAreaFormObject: {openAreaForm, setOpenAreaForm},
    } = useGlobalContextProvider();
    const { setOpenSideBar } = openSideBarObject;

    return (
        <div
            style={{
                backgroundColor: isDarkMode
                    ? darkModeColor.background
                    : defaultColor.background,
                color: isDarkMode
                    ? darkModeColor.textColor
                    : "black",
            }}
            className="p-5 rounded-md flex justify-between items-center transition-all"
        >
            <div className="flex gap-5 items-center">
                <span className="text-xl font-bold">Tags</span>
                <Button
                    style={{ backgroundColor: defaultColor.default }}
                    className="text-white p-2 px-4 ml-3"
                    size="small"
                    icon="plus"
                    onClick={() => setOpenAreaForm(true)}
                >
                    Add Tag
                </Button>
            </div>
            <FontAwesomeIcon
                onClick={() => setOpenSideBar(true)}
                className="m-2 max-xl:flex hidden mt-[13px] cursor-pointer"
                icon={faBars}
            />
        </div>
    );
}

export default TagsTopBar;
