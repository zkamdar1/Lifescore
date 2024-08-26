import React from "react";
import LogoAndName from "../LogoAndName";
import MenuSelection from "./MenuSelection";
import LogoutSelection from "./LogoutSelection";

function Sidebar() {
    return (
        <div className="flex-grow p-10 flex flex-col bg-white min-h-screen">
            <LogoAndName />
            <MenuSelection />
            <LogoutSelection />
        </div>
    );
}

export default Sidebar;