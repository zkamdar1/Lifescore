import React from "react";
import { AreaType } from "../../Types/GlobalTypes";
import { iconToText } from "../../Pages/AllHabits/Components/IconsWindow/IconData";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import toast from "react-hot-toast";

export default async function editArea({
    areaItem,
    allAreas,
    setAllAreas,
}: {
    areaItem: AreaType;
    allAreas: AreaType[];
    setAllAreas: React.Dispatch<React.SetStateAction<AreaType[]>>;
}) {
    const { icon } = areaItem;
    const areaIconText = iconToText(icon as IconProp);
    const copyAreaItem = { ...areaItem, icon: areaIconText };

    const updatedAllAreas = allAreas.map((area) => {
        if (area._id === areaItem._id) {
            return areaItem;
        } else {
            return area;
        }
    });

    try {
        const response = await fetch(`/api/areas?areaId=${copyAreaItem._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: copyAreaItem.name,
                icon: copyAreaItem.icon,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to edit tag");
        }

        setAllAreas(updatedAllAreas);
        toast.success("Tag has been updated successfully!");
    } catch (error) {

    }
}
