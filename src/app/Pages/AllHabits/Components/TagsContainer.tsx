import { useGlobalContextProvider } from "@/src/app/contextApi";
import React, { useEffect, useState } from "react";
import { AreaType } from "@/src/app/Types/GlobalTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkModeColor, defaultColor } from "@/colors";

export default function TagsContainer() {
    const { allAreasObject, darkModeObject, selectedTagStringObject } = useGlobalContextProvider();
    const { allAreas } = allAreasObject;
    const { isDarkMode } = darkModeObject;
    const { setSelectedTagString } = selectedTagStringObject;

    const [selectedTags, setSelectedTags] = useState<{
        [key: number]: boolean;
    }>({});
    
    const toggleSelection = (index: number) => {
        const selectedTagsCopy = { ...selectedTags };

        Object.keys(selectedTagsCopy).forEach((key) => {
            selectedTagsCopy[parseInt(key)] = false;
        })

        selectedTagsCopy[index] = true;

        setSelectedTagString(allAreas[index].name);

        setSelectedTags(selectedTagsCopy);
    };

    useEffect(() => {
        const initialSelectedTag: { [key: number]: boolean } = {};

        allAreas.forEach((_, index) => {
            initialSelectedTag[index] = false;
        });

        initialSelectedTag[0] = true;

        setSelectedTags(initialSelectedTag);
    }, [allAreas]);

    return (
        <div
            style={{
                backgroundColor: isDarkMode
                  ? darkModeColor.background
                  : defaultColor.background,
              }}
            className="p-5 rounded-md flex gap-3 items-center transition-all mt-5 text-sm"
        >
            {allAreas.map((tag: AreaType, index) => (
                <div
                    onClick={() => toggleSelection(index)}
                    key={index}
                >
                    <SingleTagContainer
                        singleTag={tag}
                        isSelected={selectedTags[index]}
                    />
                </div>
            ))}
        </div>
    );

    function SingleTagContainer({
        singleTag,
        isSelected,
    }: {
        singleTag: AreaType,
        isSelected: boolean,
    }) {
        return (
            <div
                className={`p-2 px-3 rounded-md flex gap-1 items-center cursor-pointer ${
                    isSelected ? "bg-customRed text-white" : "text-gray-400"
                }`}
            >
                <FontAwesomeIcon icon={singleTag.icon} />
                <span>{singleTag.name}</span>
            </div>
        );
    }
}