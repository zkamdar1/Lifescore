import React, { useEffect, useRef } from "react";
import LogoAndName from "../LogoAndName";
import MenuSelection from "./MenuSelection";
import LogoutSelection from "./LogoutSelection";
import { useGlobalContextProvider } from "../../contextApi";

function Sidebar() {
    const { openSideBarObject } = useGlobalContextProvider();
    const { openSideBar, setOpenSideBar } = openSideBarObject;
    const sideBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (!sideBarRef.current?.contains(event.target as Node)) {
                setOpenSideBar(false);
            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [openSideBar]);

    return (
        <div
            ref={sideBarRef}
            className={`${!openSideBar ? "max-xl:hidden" : "fixed shadow-lg"} flex-grow z-50 p-10 flex-col bg-white min-h-screen`}
        >
            <LogoAndName />
            <MenuSelection />
            <LogoutSelection />
        </div>
    );
}

export default Sidebar;
