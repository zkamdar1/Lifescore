import { menuItemType } from "./MenuItemType";
import { Dispatch, SetStateAction } from "react";

export type GlobalContextType = {
    menuItemObject: {
        menuItems: menuItemType[];
        setMenuItems: Dispatch<SetStateAction<menuItemType[]>>;
    };
    openSideBarObject: {
        openSideBar: boolean;
        setOpenSideBar: Dispatch<SetStateAction<boolean>>;
    };
};