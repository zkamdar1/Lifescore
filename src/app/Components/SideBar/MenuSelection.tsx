import React from "react";
import { useGlobalContextProvider } from "@/src/app/contextApi";
import { menuItemType } from "../../Types/MenuItemType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MenuSelection() {
    const { menuItemObject } = useGlobalContextProvider();
    const { menuItems } = menuItemObject;

    return (
        <div className="mt-[180px]">
            {menuItems.map((menuItem: menuItemType, menuItemIndex: number) => (
                <div key={menuItemIndex}>
                    <SingleMenuItem menuItemProp={menuItem} />
                </div>
            ))}
        </div>
    );
}

function SingleMenuItem({ menuItemProp }: { menuItemProp: menuItemType }) {
    const { menuItemObject } = useGlobalContextProvider();
    const { menuItems, setMenuItems } = menuItemObject;

    function handleClickedItem() {
        const copyMenuItems = menuItems.map((menuItem) => {
            if (menuItemProp.name === menuItem.name) {
                return { ...menuItem, isSelected: true };
            }

            return { ...menuItem, isSelected: false }
        });

        setMenuItems(copyMenuItems);
    }

    return (
        <div
            onClick={handleClickedItem}
            className={`flex gap-2 items-center p-3 mb-3 ml-7 cursor-pointer rounded-md w-36 select-none ${menuItemProp.isSelected ? "bg-customRed transition-all text-white" : "hover:text-customRed"}`}
        >
            <FontAwesomeIcon
                className=" "
                icon={menuItemProp.icon}
                width={20}
                height={20}
            />
            <div>{menuItemProp.name}</div>
        </div>
    );
}

export default MenuSelection;
