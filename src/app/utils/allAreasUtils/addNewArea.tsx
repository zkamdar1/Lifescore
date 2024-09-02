import React from "react";
import { AreaType } from "../../Types/GlobalTypes";
import toast from "react-hot-toast";
import { iconToText } from "../../Pages/AllHabits/Components/IconsWindow/IconData";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default async function addNewArea({
    areaItem,
    allAreas,
    setAllAreas,
}: {
    areaItem: Omit<AreaType, "_id">;
    allAreas: AreaType[];
    setAllAreas: React.Dispatch<React.SetStateAction<AreaType[]>>;
    }) {
        try {
            const { icon } = areaItem;
            const areaIconText = iconToText(icon as IconProp);

            const updatedArea = { ...areaItem, icon: areaIconText };

            try {
                const response = await fetch("/api/areas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "applications/json",
                    },

                    body: JSON.stringify(updatedArea),
                });

                if (!response.ok) {
                    throw new Error("Failed to add habit")
                }

                const data = await response.json();
                const { _id } = data.area;

                const updatedIdOfArea = { ...areaItem, _id: _id };

                setAllAreas([...allAreas, updatedIdOfArea]);
                toast.success("Tag added successfully!");
            } catch (error) {
                toast.error("Something went wrong");

            }
        } catch (error) {
            console.log(error);
        }
}
