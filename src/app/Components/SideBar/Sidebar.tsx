import React from "react";
import LogoAndName from "../LogoAndName";
import MenuSelection from "./MenuSelection";
import LogoutSelection from "./LogoutSelection";

function Sidebar() {
    return (
        <div className="h-screen p-12">
            <LogoAndName />
            <MenuSelection />
            <LogoutSelection />
        </div>
    );
}

export default Sidebar;